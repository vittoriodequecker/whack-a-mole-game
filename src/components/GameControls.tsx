import { Link } from "react-router-dom";
import { Play, RotateCcw, Trophy, Settings } from "lucide-react";

type GameControlsProps = {
  status: "Ready to Play" | "playing" | "finished";
  gameDurationSeconds: number;
  onStart: (duration: number) => void;
  onReset: () => void;
  onOpenSettings: () => void;
};

const baseButtonClass =
  "inline-flex items-center justify-center gap-2 rounded-xl border px-4 py-2.5 text-sm font-semibold shadow-md transition-all duration-200 hover:-translate-y-0.5 hover:shadow-lg active:translate-y-0 active:scale-[0.98]";

const darkButtonClass =
  "border-slate-700 bg-slate-900/85 text-slate-100 hover:bg-slate-800";

const primaryButtonClass =
  "border-slate-800 bg-slate-950 text-white hover:bg-slate-800";

const disabledButtonClass =
  "disabled:cursor-not-allowed disabled:opacity-40 disabled:hover:translate-y-0 disabled:hover:shadow-md";

const GameControls = ({
  status,
  gameDurationSeconds,
  onStart,
  onReset,
  onOpenSettings,
}: GameControlsProps) => {
  return (
    <div className="mb-3 flex flex-wrap justify-center gap-3">
      <button
        type="button"
        onClick={() => onStart(gameDurationSeconds)}
        disabled={status === "playing"}
        className={`${baseButtonClass} ${primaryButtonClass} ${disabledButtonClass}`}
      >
        <Play size={16} />
        <span>Start</span>
      </button>

      <button
        type="button"
        onClick={onReset}
        disabled={status === "Ready to Play"}
        className={`${baseButtonClass} ${darkButtonClass} ${disabledButtonClass}`}
      >
        <RotateCcw size={16} />
        <span>Reset</span>
      </button>

      <Link
        to="/leaderboard"
        className={`${baseButtonClass} ${darkButtonClass}`}
      >
        <Trophy size={16} />
        <span>Leaderboard</span>
      </Link>

      <button
        type="button"
        onClick={onOpenSettings}
        className={`${baseButtonClass} ${darkButtonClass}`}
      >
        <Settings size={16} />
        <span>Settings</span>
      </button>
    </div>
  );
};

export default GameControls;