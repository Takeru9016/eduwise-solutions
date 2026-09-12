import { Ratelimit } from "@upstash/ratelimit";
import { Redis } from "@upstash/redis";

/**
 * Distributed rate limiting via Upstash Redis (works correctly across
 * Vercel's serverless/multi-instance deployment, unlike an in-memory Map).
 * Fails open - logs a warning and allows the request - when
 * UPSTASH_REDIS_REST_URL / UPSTASH_REDIS_REST_TOKEN aren't configured,
 * so a missing env var never blocks real leads. Configure Upstash (or
 * Vercel's own Firewall/WAF at the platform level) before relying on this
 * in production.
 */

let redis: Redis | null = null;
let warnedMissingConfig = false;

function getRedis(): Redis | null {
  if (redis) {
    return redis;
  }
  if (
    !(
      process.env.UPSTASH_REDIS_REST_URL && process.env.UPSTASH_REDIS_REST_TOKEN
    )
  ) {
    if (!warnedMissingConfig) {
      console.warn(
        "[rate-limit] UPSTASH_REDIS_REST_URL/UPSTASH_REDIS_REST_TOKEN not configured - rate limiting is disabled"
      );
      warnedMissingConfig = true;
    }
    return null;
  }
  redis = Redis.fromEnv();
  return redis;
}

const limiters = new Map<string, Ratelimit>();

function getLimiter(
  name: string,
  limit: number,
  windowSeconds: number
): Ratelimit | null {
  const client = getRedis();
  if (!client) {
    return null;
  }
  const cacheKey = `${name}:${limit}:${windowSeconds}`;
  let limiter = limiters.get(cacheKey);
  if (!limiter) {
    limiter = new Ratelimit({
      analytics: false,
      limiter: Ratelimit.slidingWindow(limit, `${windowSeconds} s`),
      prefix: `ratelimit:${name}`,
      redis: client,
    });
    limiters.set(cacheKey, limiter);
  }
  return limiter;
}

export interface RateLimitCheck {
  allowed: boolean;
  reason?: string;
}

/**
 * Checks a single rate-limit bucket. Returns allowed:true when Upstash is
 * not configured (fail open) or when the request is within limits.
 */
export async function checkRateLimit(
  name: string,
  key: string,
  limit: number,
  windowSeconds: number
): Promise<RateLimitCheck> {
  const limiter = getLimiter(name, limit, windowSeconds);
  if (!limiter) {
    return { allowed: true };
  }

  try {
    const result = await limiter.limit(key);
    return result.success
      ? { allowed: true }
      : { allowed: false, reason: name };
  } catch (error) {
    console.error(`[rate-limit] Upstash request failed for "${name}":`, error);
    // Fail open on infra errors too - an Upstash outage must not take
    // down lead capture on a revenue site.
    return { allowed: true };
  }
}
