import { NextResponse } from "next/server";
import { submitVote } from "@/wix-api/polls";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { pollId, userId, option } = body;

    if (!pollId || !userId || !option) {
      return NextResponse.json({ error: "Missing data" }, { status: 400 });
    }

    await submitVote(pollId, userId, option);

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Vote error:", error);

    return NextResponse.json({ error: "Vote failed" }, { status: 500 });
  }
}
