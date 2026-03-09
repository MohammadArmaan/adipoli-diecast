import { getWixClient } from "@/lib/wix-client.base";
import { getWixServerClient } from "@/lib/wix-client.server";

export type Poll = {
  title: string;
  question: string;
  option1: string;
  option2: string;
  option3?: string;
  option4?: string;
  active: boolean;
};

export type PollVote = {
  _id?: string;
  pollId: string;
  userId: string;
  selectedOption: string;
  createdAt: Date;
};

export type WixItem<T> = T & { _id: string };

export async function getActivePoll(): Promise<WixItem<Poll> | null> {
  const wix = getWixClient(); // public collection, OK

  const res = await wix.items.query("Polls").eq("active", true).limit(1).find();

  const poll = res.items?.[0];

  if (!poll) return null;

  return poll as WixItem<Poll>;
}

export async function hasUserVoted(
  pollId: string,
  userId: string,
): Promise<boolean> {
  const wix = await getWixServerClient();

  const res = await wix.items
    .query("PollVotes")
    .eq("pollId", pollId)
    .eq("userId", userId)
    .find();

  return (res.items?.length ?? 0) > 0;
}

export async function submitVote(
  pollId: string,
  userId: string,
  selectedOption: string,
) {
  const wix = await getWixServerClient();

  const alreadyVoted = await hasUserVoted(pollId, userId);

  if (alreadyVoted) {
    throw new Error("User already voted");
  }

  const vote: PollVote = {
    pollId,
    userId,
    selectedOption,
    createdAt: new Date(),
  };

  return wix.items.insert("PollVotes", vote);
}

export async function getPollResults(pollId: string) {
  const wix = await getWixServerClient();

  const res = await wix.items.query("PollVotes").eq("pollId", pollId).find();

  console.log("PollVotes query:", res.items);

  return res.items as PollVote[];
}

export async function getPollResultCounts(pollId: string) {
  const votes = await getPollResults(pollId);

  const counts: Record<string, number> = {};

  for (const vote of votes) {
    if (!vote?.selectedOption) continue;

    counts[vote.selectedOption] = (counts[vote.selectedOption] ?? 0) + 1;
  }

  return counts;
}
