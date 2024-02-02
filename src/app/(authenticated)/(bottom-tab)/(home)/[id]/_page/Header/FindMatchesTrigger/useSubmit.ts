"use client";

import * as React from "react";
import {
  getMatchInput,
  getMatchOutput,
  createMatch,
} from "@/modules/api/client";
import { useParams } from "next/navigation";

export default function useSubmit() {
  const [error, setError] = React.useState<Error | null | undefined>();
  const [status, setStatus] = React.useState<
    "idle" | "loadingInput" | "loadingOutput"
  >("idle");
  const params = useParams();

  const isLoading = status !== "idle";

  async function submit() {
    if (isLoading) return { success: undefined };

    if (!params.id || typeof params.id !== "string") {
      // TODO: This should impossible. But we should get a type safe
      // way to get the id.
      throw new Error("ID not found");
    }

    setStatus("loadingInput");
    setError(null);

    try {
      const input = await getMatchInput(params.id);
      const { dataAsCSV, ...rest } = input;
      const output = await fakeGetMatchOutput(input);
      createMatch(params.id, {
        input: rest,
        output,
      });
      return { success: true };
    } catch (error: any) {
      setError(error);
      return { success: false };
    } finally {
      setStatus("idle");
    }
  }

  return {
    isLoading,
    status,
    error,
    submit,
  };
}

async function fakeGetMatchOutput(
  input: Awaited<ReturnType<typeof getMatchInput>>
): Promise<ReturnType<typeof getMatchOutput>> {
  const contentWithRandomScores = input.content.map((c) => {
    return {
      ...c,
      score: parseFloat(getRandomFloatBetween(0.8, 1).toFixed(2)),
    };
  });

  const max = Math.min(3, contentWithRandomScores.length);
  const recommendations = contentWithRandomScores.slice(0, max).map((c) => {
    return {
      Title: c.Title,
      score: c.score,
      possibleIMDBId: c.imdbID,
      possiblePoster: c.Poster,
    };
  });

  return { content: contentWithRandomScores, recommendations };
}

function getRandomFloatBetween(min: number, max: number) {
  return Math.random() * (max - min) + min;
}
