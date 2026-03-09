import { NextResponse } from "next/server";
import { getWixServerClient } from "@/lib/wix-client.server";
import { getLoggedInMember } from "@/wix-api/members";

export async function GET() {
  const wixClient = await getWixServerClient();
  const member = await getLoggedInMember(wixClient);

  return NextResponse.json(member ?? null);
}
