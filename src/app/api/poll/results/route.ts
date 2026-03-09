import { NextResponse } from "next/server";
import { getPollResultCounts } from "@/wix-api/polls";

export async function POST(req: Request) {
  try {
    const { pollId } = await req.json();

    const results = await getPollResultCounts(pollId);

    return NextResponse.json(results);

  } catch (error) {
    console.error("Poll results error:", error);

    return NextResponse.json(
      { error: "Failed to fetch results" },
      { status: 500 }
    );
  }
}