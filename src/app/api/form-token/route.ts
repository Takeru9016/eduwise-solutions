import { NextResponse } from "next/server";
import { issueFormToken } from "@/lib/security/form-token";

export function GET() {
  return NextResponse.json(
    { token: issueFormToken() },
    { headers: { "Cache-Control": "no-store" } }
  );
}
