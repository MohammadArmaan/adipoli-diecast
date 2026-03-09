"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Poll, WixItem } from "@/wix-api/polls";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";

import { motion } from "framer-motion";
import useAuth from "@/hooks/auth";

export default function PollSection() {
  const router = useRouter();
  const { login } = useAuth();

  const [poll, setPoll] = useState<WixItem<Poll> | null>(null);
  const [results, setResults] = useState<Record<string, number> | null>(null);
  const [loading, setLoading] = useState(true);
  const [voting, setVoting] = useState(false);

  useEffect(() => {
    async function loadPoll() {
      const pollRes = await fetch("/api/poll/active");
      const p = await pollRes.json();

      if (!p) {
        setLoading(false);
        return;
      }

      setPoll(p);

      // check member
      const memberRes = await fetch("/api/member");
      const member = await memberRes.json();

      if (member) {
        const votedRes = await fetch("/api/poll/hasVoted", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            pollId: p._id,
            userId: member._id,
          }),
        });

        const { voted } = await votedRes.json();

        if (voted) {
          const resultRes = await fetch("/api/poll/results", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              pollId: p._id,
            }),
          });

          const result = await resultRes.json();

          setResults(result);
        }
      }

      setLoading(false);
    }

    loadPoll();
  }, []);

  async function handleVote(option: string) {
    if (!poll) return;

    const res = await fetch("/api/member");
    const member = await res.json();

    if (!member) {
      await login();
      return;
    }

    try {
      setVoting(true);

      await fetch("/api/poll/vote", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          pollId: poll._id,
          userId: member._id,
          option,
        }),
      });

      const resultRes = await fetch("/api/poll/results", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          pollId: poll._id,
        }),
      });

      const result = await resultRes.json();

      setResults(result);
    } finally {
      setVoting(false);
    }
  }

  if (loading || !poll) return null;

  const options = [
    poll.option1,
    poll.option2,
    poll.option3,
    poll.option4,
  ].filter((opt): opt is string => Boolean(opt));

  const totalVotes =
    results && Object.values(results).reduce((a, b) => a + b, 0);

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="mx-auto max-w-xl"
    >
      <Card className="border-border bg-card shadow-xl">
        <CardHeader>
          <CardTitle className="text-center text-xl font-semibold">
            Community Poll
          </CardTitle>
        </CardHeader>

        <CardContent className="space-y-4">
          <p className="text-center text-lg font-medium">{poll.question}</p>

          {!results ? (
            <div className="space-y-3">
              {options.map((opt) => (
                <motion.div
                  key={opt}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <Button
                    disabled={voting}
                    onClick={() => handleVote(opt)}
                    className="w-full justify-start text-left"
                    variant="outline"
                  >
                    {opt}
                  </Button>
                </motion.div>
              ))}
            </div>
          ) : (
            <div className="space-y-4">
              {options.map((opt) => {
                const count = results[opt] ?? 0;
                const percent = totalVotes
                  ? Math.round((count / totalVotes) * 100)
                  : 0;

                return (
                  <motion.div
                    key={opt}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.3 }}
                    className="space-y-1"
                  >
                    <div className="flex justify-between text-sm font-medium">
                      <span>{opt}</span>
                      <span>{percent}%</span>
                    </div>

                    <Progress value={percent} className="h-2" />

                    <div className="text-xs text-muted-foreground">
                      {count} votes
                    </div>
                  </motion.div>
                );
              })}

              <div className="pt-2 text-center text-xs text-muted-foreground">
                Total votes: {totalVotes}
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </motion.div>
  );
}
