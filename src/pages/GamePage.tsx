import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { interval, Subscription } from "rxjs";

import { useNavigate, Link } from "react-router-dom";
import { saveScore } from "../utils/leaderboard";
import GameBoard from "../components/GameBoard";
import type { RootState } from "../app/store";
import {
  startGame,
  decreaseTime,
  setActiveMole,
  resetGame,
} from "../features/game/gameSlice";
import SettingsModal from "../components/SettingsModal";
import NameModal from "../components/NameModal";

const GamePage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [showNameModal, setShowNameModal] = useState(false);
  const [playerName, setPlayerName] = useState("");
  const [pendingScore, setPendingScore] = useState<number | null>(null);
  const [showSettingsModal, setShowSettingsModal] = useState(false);

  const score = useSelector((state: RootState) => state.game.score);
  const timeLeft = useSelector((state: RootState) => state.game.timeLeft);
  const status = useSelector((state: RootState) => state.game.status);
  
  const { rows, columns, moleIntervalMs, gameDurationSeconds } = useSelector(
    (state: RootState) => state.settings
  );

  const totalMoles = rows * columns;

  useEffect(() => {
    if (status !== "playing") return;

    const subscription = new Subscription();

    const timer$ = interval(1000).subscribe(() => {
      dispatch(decreaseTime());
    });

    const mole$ = interval(moleIntervalMs).subscribe(() => {
      const randomIndex = Math.floor(Math.random() * totalMoles);
      dispatch(setActiveMole(randomIndex));
    });

    subscription.add(timer$);
    subscription.add(mole$);

    return () => subscription.unsubscribe();
  }, [status, dispatch, moleIntervalMs, totalMoles]);
  
  useEffect(() => {
    if (status !== "finished") return;

    setPendingScore(score);
    setShowNameModal(true);
  }, [status, score]);

  useEffect(() => {
    const existingLeaderboard = localStorage.getItem("leaderboard");

    if (!existingLeaderboard) {
      const mockLeaderboard = [
        { name: "Alice", score: 24 },
        { name: "Bob", score: 19 },
        { name: "Charlie", score: 17 },
        { name: "Diana", score: 15 },
        { name: "Ethan", score: 12 },
      ];

      localStorage.setItem("leaderboard", JSON.stringify(mockLeaderboard));
    }
  }, []);

  const handleSaveScore = () => {
    if (pendingScore === null) return;

    const finalName = playerName.trim() || "Anonymous";

    saveScore(finalName, pendingScore);
    setPlayerName("");
    setPendingScore(null);
    setShowNameModal(false);
    dispatch(resetGame());
    navigate("/leaderboard");
  };

  const formatTime = (totalSeconds: number) => {
    const minutes = Math.floor(totalSeconds / 60);
    const seconds = totalSeconds % 60;

    return `${String(minutes).padStart(2, "0")}:${String(seconds).padStart(2, "0")}`;
  };

  return (
    <div className="flex min-h-screen flex-col items-center">
      <h1 className="mt-10 mb-8 text-4xl font-bold text-white">
        Whack-a-Mole
      </h1>

      <div className="mb-6 flex gap-6 rounded bg-black/40 px-6 py-3 text-white">
        <p>Score: {score}</p>
        <p>Time: {formatTime(timeLeft)}</p>
        <p>Status: {status}</p>
      </div>

      <div className="mb-8 flex gap-4">
        <button
          type="button"
          onClick={() => dispatch(startGame(gameDurationSeconds))}
          disabled={status === "playing"}
          className="rounded bg-white px-4 py-2 font-semibold text-black disabled:opacity-50"
        >
          Start Game
        </button>

        <button
          type="button"
          onClick={() => dispatch(resetGame())}
          disabled={status === "Ready to Play"}
          className="rounded bg-red-500 px-4 py-2 font-semibold text-white disabled:opacity-50"
        >
          Reset Game
        </button>

        <Link
          to="/leaderboard"
          className="rounded bg-yellow-400 px-4 py-2 font-semibold text-black"
        >
          View Leaderboard
        </Link>

        <button
          type="button"
          onClick={() => setShowSettingsModal(true)}
          className="rounded bg-blue-500 px-4 py-2 font-semibold text-white"
        >
          Settings
        </button>
      </div>
      <GameBoard />

      <SettingsModal
        isOpen={showSettingsModal}
        onClose={() => setShowSettingsModal(false)}
        disabled={status === "playing"}
      />

      <NameModal
        isOpen={showNameModal}
        score={pendingScore}
        playerName={playerName}
        onChangePlayerName={setPlayerName}
        onSkip={handleSaveScore}
        onSave={handleSaveScore}
      />
    </div>
  );
};

export default GamePage;