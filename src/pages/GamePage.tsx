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

const GamePage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [showNameModal, setShowNameModal] = useState(false);
  const [playerName, setPlayerName] = useState("");
  const [pendingScore, setPendingScore] = useState<number | null>(null);

  const score = useSelector((state: RootState) => state.game.score);
  const timeLeft = useSelector((state: RootState) => state.game.timeLeft);
  const status = useSelector((state: RootState) => state.game.status);

  useEffect(() => {
    if (status !== "playing") return;

    const subscription = new Subscription();

    const timer$ = interval(1000).subscribe(() => {
      dispatch(decreaseTime());
    });

    const mole$ = interval(1000).subscribe(() => {
      const randomIndex = Math.floor(Math.random() * 12);
      dispatch(setActiveMole(randomIndex));
    });

    subscription.add(timer$);
    subscription.add(mole$);

    return () => subscription.unsubscribe();
  }, [status, dispatch]);
  
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

  return (
    <div className="flex min-h-screen flex-col items-center">
      <h1 className="mt-10 mb-8 text-4xl font-bold text-white">
        Whack-a-Mole
      </h1>

      <div className="mb-6 flex gap-6 rounded bg-black/40 px-6 py-3 text-white">
        <p>Score: {score}</p>
        <p>Time: {timeLeft}s</p>
        <p>Status: {status}</p>
      </div>

      <div className="mb-8 flex gap-4">
        <button
          type="button"
          onClick={() => dispatch(startGame())}
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
      </div>
      <GameBoard />

      {showNameModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 px-4">
          <div className="w-full max-w-md rounded-2xl bg-white p-6 shadow-2xl">
            <h2 className="mb-4 text-2xl font-bold text-black">
              Save your score
            </h2>

            <p className="mb-4 text-gray-700">
              Your score: <span className="font-semibold">{pendingScore}</span>
            </p>

            <input
              type="text"
              value={playerName}
              onChange={(e) => setPlayerName(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  handleSaveScore();
                }
              }}
              placeholder="Enter your name"
              maxLength={20}
              className="mb-4 w-full rounded-lg border border-gray-300 px-4 py-2 text-black outline-none focus:border-black"
            />

            <div className="flex justify-end gap-3">
              <button
                type="button"
                onClick={handleSaveScore}
                className="rounded-lg bg-gray-200 px-4 py-2 font-semibold text-black"
              >
                Skip
              </button>

              <button
                type="button"
                onClick={handleSaveScore}
                className="rounded-lg bg-black px-4 py-2 font-semibold text-white"
              >
                Save score
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default GamePage;