import { NextResponse } from "next/server";
import { getActivePoll } from "@/wix-api/polls";

export async function GET() {
  const poll = await getActivePoll();
  return NextResponse.json(poll);
}
