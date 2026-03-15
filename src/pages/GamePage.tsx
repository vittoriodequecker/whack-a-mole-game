import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { interval, Subscription } from "rxjs";

import { useNavigate } from "react-router-dom";
import { getRank, saveScore } from "../utils/leaderboard";
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
import ScoreDisplay from "../components/ScoreDisplay";
import GameControls from "../components/GameControls";

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

  const [rank, setRank] = useState<number | null>(null);

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
    setRank(getRank(score));
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
    setRank(null);
    setShowNameModal(false);
    dispatch(resetGame(gameDurationSeconds));
    navigate("/leaderboard");
  };

  return (
    <div className="flex min-h-screen flex-col items-center">      
      <h1 className="mt-10 mb-8 text-4xl font-bold text-white">
        Whack-a-Mole
      </h1>

      <ScoreDisplay
        score={score}
        timeLeft={timeLeft}
        status={status}
      />

      <GameControls
        status={status}
        gameDurationSeconds={gameDurationSeconds}
        onStart={(duration) => dispatch(startGame(duration))}
        onReset={() => dispatch(resetGame(gameDurationSeconds))}
        onOpenSettings={() => setShowSettingsModal(true)}
      />

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
        rank={rank}
        onChangePlayerName={setPlayerName}
        onSkip={handleSaveScore}
        onSave={handleSaveScore}
      />
    </div>
  );
};

export default GamePage;