import type { Metadata } from "next";
import Link from "next/link";
import { TicTacToe } from "@/components/games/TicTacToe";

export const metadata: Metadata = {
  title: "Tic-Tac-Toe",
  description:
    "Play classic Tic-Tac-Toe online — challenge a friend or the AI. Free, no signup.",
};

export default function TicTacToePage() {
  return (
    <div className="mx-auto max-w-5xl px-4 py-10 sm:py-14">
      <div className="mb-8 text-center sm:text-left">
        <Link
          href="/"
          className="text-sm font-medium text-muted hover:text-accent transition"
        >
          ← All games
        </Link>
        <h1 className="mt-3 text-3xl font-bold tracking-tight text-ink">Tic-Tac-Toe</h1>
        <p className="mt-2 text-muted max-w-lg">
          Classic 3×3. Play against a friend on the same device, or challenge the AI on Easy or
          Hard.
        </p>
      </div>
      <TicTacToe />
    </div>
  );
}
