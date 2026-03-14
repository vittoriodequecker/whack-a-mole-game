import { Link } from "react-router-dom";

type GameControlsProps = {
  status: "Ready to Play" | "playing" | "finished";
  gameDurationSeconds: number;
  onStart: (duration: number) => void;
  onReset: () => void;
  onOpenSettings: () => void;
};

const GameControls = ({
  status,
  gameDurationSeconds,
  onStart,
  onReset,
  onOpenSettings,
}: GameControlsProps) => {
  return (
    <div className="mb-2 flex flex-wrap justify-center gap-4">
      <button
        type="button"
        onClick={() => onStart(gameDurationSeconds)}
        disabled={status === "playing"}
        className="rounded-2xl bg-white px-5 py-3 font-bold text-black shadow-lg transition hover:scale-105 hover:bg-yellow-300 disabled:cursor-not-allowed disabled:opacity-50 disabled:hover:scale-100"
      >
        Start Game
      </button>

      <button
        type="button"
        onClick={onReset}
        disabled={status === "Ready to Play"}
        className="rounded-2xl bg-red-500 px-5 py-3 font-bold text-white shadow-lg transition hover:scale-105 hover:bg-red-400 disabled:cursor-not-allowed disabled:opacity-50 disabled:hover:scale-100"
      >
        Reset Game
      </button>

      <Link
        to="/leaderboard"
        className="rounded-2xl bg-yellow-400 px-5 py-3 font-bold text-black shadow-lg transition hover:scale-105 hover:bg-yellow-300"
      >
        View Leaderboard
      </Link>

      <button
        type="button"
        onClick={onOpenSettings}
        className="rounded-2xl bg-blue-500 px-5 py-3 font-bold text-white shadow-lg transition hover:scale-105 hover:bg-blue-400"
      >
        Settings
      </button>
    </div>
  );
};

export default GameControls;