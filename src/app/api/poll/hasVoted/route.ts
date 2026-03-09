import { NextResponse } from "next/server";
import { hasUserVoted } from "@/wix-api/polls";

export async function POST(req: Request) {
  try {
    const { pollId, userId } = await req.json();

    const voted = await hasUserVoted(pollId, userId);

    return NextResponse.json({ voted });
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      { error: "Failed to check vote" },
      { status: 500 },
    );
  }
}
