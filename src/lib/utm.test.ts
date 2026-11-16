import { describe, expect, it } from "vitest";
import {
  captureUtm,
  parseUtm,
  readStoredUtm,
  UTM_STORAGE_KEY,
  UTM_TTL_MS,
} from "./utm";

function memoryStorage() {
  const data = new Map<string, string>();
  return {
    data,
    getItem: (k: string) => data.get(k) ?? null,
    removeItem: (k: string) => {
      data.delete(k);
    },
    setItem: (k: string, v: string) => {
      data.set(k, v);
    },
  };
}

describe("parseUtm", () => {
  it("reads the three tags", () => {
    expect(
      parseUtm("?utm_source=facebook&utm_medium=paid&utm_campaign=devops_nov")
    ).toEqual({ campaign: "devops_nov", medium: "paid", source: "facebook" });
  });

  it("returns null when there are no tags", () => {
    expect(parseUtm("?ref=abc")).toBeNull();
    expect(parseUtm("")).toBeNull();
  });

  it("strips control characters and caps length", () => {
    const utm = parseUtm(
      `?utm_source=${encodeURIComponent("goo\ngle")}&utm_campaign=${"x".repeat(300)}`
    );
    expect(utm?.source).toBe("google");
    expect(utm?.campaign).toHaveLength(100);
  });
});

describe("captureUtm / readStoredUtm", () => {
  it("remembers tags and returns them on a later page", () => {
    const s = memoryStorage();
    captureUtm("?utm_source=instagram&utm_campaign=c1", s, 1000);
    expect(readStoredUtm(s, 2000)).toEqual({
      campaign: "c1",
      medium: undefined,
      source: "instagram",
    });
  });

  it("keeps the old tags on an untagged visit and replaces them on a new tagged one", () => {
    const s = memoryStorage();
    captureUtm("?utm_source=facebook", s, 1000);
    captureUtm("?page=2", s, 2000);
    expect(readStoredUtm(s, 3000)?.source).toBe("facebook");
    captureUtm("?utm_source=google", s, 4000);
    expect(readStoredUtm(s, 5000)?.source).toBe("google");
  });

  it("forgets tags after 30 days", () => {
    const s = memoryStorage();
    captureUtm("?utm_source=facebook", s, 0);
    expect(readStoredUtm(s, UTM_TTL_MS + 1)).toBeUndefined();
    expect(s.data.has(UTM_STORAGE_KEY)).toBe(false);
  });

  it("ignores corrupted storage and never throws when storage fails", () => {
    const s = memoryStorage();
    s.setItem(UTM_STORAGE_KEY, "{not json");
    expect(readStoredUtm(s)).toBeUndefined();
    const broken = {
      getItem: () => {
        throw new Error("SecurityError");
      },
      removeItem: () => {
        throw new Error("SecurityError");
      },
      setItem: () => {
        throw new Error("QuotaExceededError");
      },
    };
    expect(() => captureUtm("?utm_source=x", broken)).not.toThrow();
    expect(readStoredUtm(broken)).toBeUndefined();
    expect(readStoredUtm(undefined)).toBeUndefined();
  });
});
