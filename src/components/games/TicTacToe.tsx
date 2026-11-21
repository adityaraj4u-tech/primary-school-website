"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";

type Cell = "X" | "O" | null;
type Board = Cell[];
type Mode = "pvp" | "ai";
type Difficulty = "easy" | "hard";

const WINS = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
] as const;

function emptyBoard(): Board {
  return Array(9).fill(null);
}

function getWinner(board: Board): { winner: Cell; line: number[] | null } {
  for (const [a, b, c] of WINS) {
    if (board[a] && board[a] === board[b] && board[a] === board[c]) {
      return { winner: board[a], line: [a, b, c] };
    }
  }
  return { winner: null, line: null };
}

function isDraw(board: Board) {
  return board.every(Boolean) && !getWinner(board).winner;
}

function availableMoves(board: Board) {
  return board.map((c, i) => (c === null ? i : -1)).filter((i) => i >= 0);
}

function minimax(board: Board, isMax: boolean): number {
  const { winner } = getWinner(board);
  if (winner === "O") return 10;
  if (winner === "X") return -10;
  if (isDraw(board)) return 0;

  const moves = availableMoves(board);
  if (isMax) {
    let best = -Infinity;
    for (const m of moves) {
      const next = [...board];
      next[m] = "O";
      best = Math.max(best, minimax(next, false));
    }
    return best;
  }
  let best = Infinity;
  for (const m of moves) {
    const next = [...board];
    next[m] = "X";
    best = Math.min(best, minimax(next, true));
  }
  return best;
}

function bestAiMove(board: Board, difficulty: Difficulty): number {
  const moves = availableMoves(board);
  if (moves.length === 0) return -1;

  if (difficulty === "easy" && Math.random() < 0.7) {
    return moves[Math.floor(Math.random() * moves.length)];
  }

  let bestScore = -Infinity;
  let choice = moves[0];
  for (const m of moves) {
    const next = [...board];
    next[m] = "O";
    const score = minimax(next, false);
    if (score > bestScore) {
      bestScore = score;
      choice = m;
    }
  }
  return choice;
}

export function TicTacToe() {
  const [board, setBoard] = useState<Board>(emptyBoard);
  const [turn, setTurn] = useState<"X" | "O">("X");
  const [mode, setMode] = useState<Mode>("ai");
  const [difficulty, setDifficulty] = useState<Difficulty>("hard");
  const [scores, setScores] = useState({ X: 0, O: 0, draws: 0 });
  const [thinking, setThinking] = useState(false);

  const aiTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const nextRoundTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const scoredKey = useRef<string | null>(null);

  const { winner, line } = useMemo(() => getWinner(board), [board]);
  const draw = useMemo(() => isDraw(board), [board]);
  const gameOver = !!winner || draw;

  const status = useMemo(() => {
    if (winner) return `${winner} wins! Next round…`;
    if (draw) return "It's a draw. Next round…";
    if (mode === "ai" && turn === "O") return "AI is thinking…";
    return `${turn}'s turn`;
  }, [winner, draw, turn, mode]);

  const applyMove = useCallback((index: number, player: "X" | "O") => {
    setBoard((prev) => {
      if (prev[index] || getWinner(prev).winner) return prev;
      const next = [...prev];
      next[index] = player;
      return next;
    });
    setTurn((t) => (t === "X" ? "O" : "X"));
  }, []);

  useEffect(() => {
    if (!gameOver) {
      scoredKey.current = null;
      return;
    }
    const key = board.join(",") + (winner ?? "D");
    if (scoredKey.current === key) return;
    scoredKey.current = key;
    setScores((s) => {
      if (winner === "X") return { ...s, X: s.X + 1 };
      if (winner === "O") return { ...s, O: s.O + 1 };
      return { ...s, draws: s.draws + 1 };
    });
  }, [gameOver, winner, board]);

  // Auto-start next round after win or full board (draw)
  useEffect(() => {
    if (nextRoundTimer.current) {
      clearTimeout(nextRoundTimer.current);
      nextRoundTimer.current = null;
    }
    if (!gameOver) return;

    nextRoundTimer.current = setTimeout(() => {
      if (aiTimer.current) {
        clearTimeout(aiTimer.current);
        aiTimer.current = null;
      }
      scoredKey.current = null;
      setThinking(false);
      setBoard(emptyBoard());
      setTurn("X");
      nextRoundTimer.current = null;
    }, 1600);

    return () => {
      if (nextRoundTimer.current) {
        clearTimeout(nextRoundTimer.current);
        nextRoundTimer.current = null;
      }
    };
  }, [gameOver, board]);

  useEffect(() => {
    if (aiTimer.current) {
      clearTimeout(aiTimer.current);
      aiTimer.current = null;
    }

    if (mode !== "ai" || turn !== "O" || gameOver) {
      setThinking(false);
      return;
    }

    setThinking(true);
    const delay = difficulty === "hard" ? 400 : 280;
    const snapshot = board;
    const diff = difficulty;

    aiTimer.current = setTimeout(() => {
      const move = bestAiMove(snapshot, diff);
      if (move >= 0) applyMove(move, "O");
      setThinking(false);
      aiTimer.current = null;
    }, delay);

    return () => {
      if (aiTimer.current) {
        clearTimeout(aiTimer.current);
        aiTimer.current = null;
      }
    };
  }, [mode, turn, board, gameOver, difficulty, applyMove]);

  function handleCell(index: number) {
    if (gameOver || board[index] || thinking) return;
    if (mode === "ai" && turn !== "X") return;
    applyMove(index, turn);
  }

  function resetBoard() {
    if (aiTimer.current) {
      clearTimeout(aiTimer.current);
      aiTimer.current = null;
    }
    if (nextRoundTimer.current) {
      clearTimeout(nextRoundTimer.current);
      nextRoundTimer.current = null;
    }
    scoredKey.current = null;
    setThinking(false);
    setBoard(emptyBoard());
    setTurn("X");
  }

  function resetAll() {
    resetBoard();
    setScores({ X: 0, O: 0, draws: 0 });
  }

  function switchMode(m: Mode) {
    setMode(m);
    resetBoard();
  }

  return (
    <div className="w-full max-w-md mx-auto">
      <div className="flex gap-2 mb-6">
        <button
          type="button"
          onClick={() => switchMode("ai")}
          className={`flex-1 h-10 rounded-[var(--radius-button)] text-sm font-semibold transition ${
            mode === "ai"
              ? "bg-accent text-white shadow-sm"
              : "bg-white border border-border text-muted hover:text-ink"
          }`}
        >
          vs AI
        </button>
        <button
          type="button"
          onClick={() => switchMode("pvp")}
          className={`flex-1 h-10 rounded-[var(--radius-button)] text-sm font-semibold transition ${
            mode === "pvp"
              ? "bg-accent text-white shadow-sm"
              : "bg-white border border-border text-muted hover:text-ink"
          }`}
        >
          2 Players
        </button>
      </div>

      {mode === "ai" && (
        <div className="flex gap-2 mb-6">
          <button
            type="button"
            onClick={() => {
              setDifficulty("easy");
              resetBoard();
            }}
            className={`flex-1 h-9 rounded-lg text-xs font-medium transition ${
              difficulty === "easy"
                ? "bg-slate-800 text-white"
                : "bg-slate-100 text-muted hover:text-ink"
            }`}
          >
            Easy
          </button>
          <button
            type="button"
            onClick={() => {
              setDifficulty("hard");
              resetBoard();
            }}
            className={`flex-1 h-9 rounded-lg text-xs font-medium transition ${
              difficulty === "hard"
                ? "bg-slate-800 text-white"
                : "bg-slate-100 text-muted hover:text-ink"
            }`}
          >
            Hard
          </button>
        </div>
      )}

      <div
        className={`mb-4 rounded-[var(--radius-card)] border px-4 py-3 text-center font-semibold ${
          winner
            ? "border-green-200 bg-green-50 text-green-800"
            : draw
              ? "border-slate-200 bg-slate-50 text-slate-700"
              : "border-border bg-white text-ink"
        }`}
        aria-live="polite"
      >
        {status}
      </div>

      <div
        className="grid grid-cols-3 gap-2.5 p-3 rounded-[var(--radius-card)] bg-ink-soft shadow-lg"
        role="grid"
        aria-label="Tic-Tac-Toe board"
      >
        {board.map((cell, i) => {
          const isWinCell = line?.includes(i);
          return (
            <button
              key={i}
              type="button"
              role="gridcell"
              onClick={() => handleCell(i)}
              disabled={
                !!cell || gameOver || thinking || (mode === "ai" && turn === "O")
              }
              aria-label={cell ? `Cell ${i + 1}, ${cell}` : `Empty cell ${i + 1}`}
              className={`
                aspect-square rounded-xl text-4xl sm:text-5xl font-bold
                flex items-center justify-center transition
                disabled:cursor-default
                ${
                  isWinCell
                    ? "bg-green-400/90 text-white scale-[1.02]"
                    : "bg-white hover:bg-slate-50 active:scale-[0.98]"
                }
                ${!cell && !gameOver && !thinking ? "cursor-pointer" : ""}
              `}
            >
              {cell === "X" && (
                <span className={isWinCell ? "text-white" : "text-x"}>X</span>
              )}
              {cell === "O" && (
                <span className={isWinCell ? "text-white" : "text-o"}>O</span>
              )}
            </button>
          );
        })}
      </div>

      <div className="mt-6 grid grid-cols-3 gap-2 text-center">
        <div className="rounded-xl border border-border bg-white py-3">
          <p className="text-[10px] uppercase tracking-wider text-muted font-medium">
            {mode === "ai" ? "You (X)" : "X"}
          </p>
          <p className="mt-0.5 text-xl font-bold text-x">{scores.X}</p>
        </div>
        <div className="rounded-xl border border-border bg-white py-3">
          <p className="text-[10px] uppercase tracking-wider text-muted font-medium">Draws</p>
          <p className="mt-0.5 text-xl font-bold text-ink">{scores.draws}</p>
        </div>
        <div className="rounded-xl border border-border bg-white py-3">
          <p className="text-[10px] uppercase tracking-wider text-muted font-medium">
            {mode === "ai" ? "AI (O)" : "O"}
          </p>
          <p className="mt-0.5 text-xl font-bold text-o">{scores.O}</p>
        </div>
      </div>

      <div className="mt-5 flex gap-2">
        <button
          type="button"
          onClick={resetBoard}
          className="flex-1 h-11 rounded-[var(--radius-button)] bg-accent text-white text-sm font-semibold hover:bg-accent-hover transition"
        >
          New round
        </button>
        <button
          type="button"
          onClick={resetAll}
          className="h-11 px-4 rounded-[var(--radius-button)] border border-border bg-white text-sm font-medium text-muted hover:text-ink transition"
        >
          Reset scores
        </button>
      </div>
    </div>
  );
}
