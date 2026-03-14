import { useEffect, useRef, useState } from "react";

type ScoreDisplayProps = {
  score: number;
  timeLeft: number;
  status: "Ready to Play" | "playing" | "finished";
};

const ScoreDisplay = ({ score, timeLeft, status }: ScoreDisplayProps) => {
  const previousScore = useRef(score);
  const [showPlusOne, setShowPlusOne] = useState(false);

  useEffect(() => {
    if (score > previousScore.current) {
      setShowPlusOne(true);

      const timeout = setTimeout(() => {
        setShowPlusOne(false);
      }, 500);

      previousScore.current = score;
      return () => clearTimeout(timeout);
    }

    previousScore.current = score;
  }, [score]);

  const formatTime = (totalSeconds: number) => {
    const minutes = Math.floor(totalSeconds / 60);
    const seconds = totalSeconds % 60;

    return `${String(minutes).padStart(2, "0")}:${String(seconds).padStart(2, "0")}`;
  };

  const statusColor =
    status === "playing"
      ? "text-green-300"
      : status === "finished"
      ? "text-red-300"
      : "text-white";

  return (
    <div className="mb-6 grid w-full max-w-xl grid-cols-1 gap-3 sm:grid-cols-3">
      <div className="min-w-0 rounded-xl border border-white/10 bg-black/50 px-4 py-3 text-white shadow-lg backdrop-blur-sm">
        <div className="relative min-w-0 select-none">
          <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-white/60">
            Score
          </p>

          <p className="mt-1 text-2xl font-black text-yellow-300">{score}</p>

          {showPlusOne && (
            <span className="pointer-events-none absolute top-0 left-12 animate-score-pop text-lg font-black text-green-300">
              +1
            </span>
          )}
        </div>
      </div>

      <div className="min-w-0 rounded-xl border border-white/10 bg-black/50 px-4 py-3 text-white shadow-lg backdrop-blur-sm">
        <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-white/60">
          Time
        </p>
        <p className="mt-1 text-2xl font-black text-cyan-300">{formatTime(timeLeft)}</p>
      </div>

      <div className="min-w-0 rounded-xl border border-white/10 bg-black/50 px-4 py-3 text-white shadow-lg backdrop-blur-sm">
        <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-white/60">
          Status
        </p>
        <p className={`mt-1 truncate text-xl font-black ${statusColor}`}>
          {status}
        </p>
      </div>
    </div>
  );
};

export default ScoreDisplay;