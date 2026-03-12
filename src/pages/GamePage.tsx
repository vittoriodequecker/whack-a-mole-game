import GameBoard from "../components/GameBoard";
import { useDispatch, useSelector } from "react-redux";
import { startGame } from "../features/game/gameSlice";
import type { RootState } from "../app/store";

const GamePage = () => {
  const dispatch = useDispatch();

  const score = useSelector((state: RootState) => state.game.score);
  const timeLeft = useSelector((state: RootState) => state.game.timeLeft);
  const status = useSelector((state: RootState) => state.game.status);

  return (
    <div className="flex min-h-screen flex-col items-center">
      <h1 className="mt-10 mb-8 text-4xl font-bold text-white">
        Whack-a-Mole
      </h1>

      <div className="mb-6 flex gap-6 text-white">
        <p>Score: {score}</p>
        <p>Time: {timeLeft}</p>
        <p>Status: {status}</p>
      </div>

      <button
        onClick={() => dispatch(startGame())}
        className="mb-8 rounded bg-white px-4 py-2"
      >
        Start Game
      </button>

      <GameBoard />
    </div>
  );
};

export default GamePage;