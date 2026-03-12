import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { interval, Subscription } from "rxjs";

import GameBoard from "../components/GameBoard";
import type { RootState } from "../app/store";
import {
  startGame,
  decreaseTime,
  setActiveMole,
  endGame,
} from "../features/game/gameSlice";

const GamePage = () => {
  const dispatch = useDispatch();

  const score = useSelector((state: RootState) => state.game.score);
  const timeLeft = useSelector((state: RootState) => state.game.timeLeft);
  const status = useSelector((state: RootState) => state.game.status);

  useEffect(() => {
    if (status !== "playing") return;

    const subscription = new Subscription();

    const timer$ = interval(1000).subscribe(() => {
      dispatch(decreaseTime());
    });

    const mole$ = interval(800).subscribe(() => {
      const randomIndex = Math.floor(Math.random() * 12);
      dispatch(setActiveMole(randomIndex));
    });

    subscription.add(timer$);
    subscription.add(mole$);

    return () => subscription.unsubscribe();
  }, [status, dispatch]);

  useEffect(() => {
    if (timeLeft === 0 && status === "playing") {
      dispatch(endGame());
    }
  }, [timeLeft, status, dispatch]);

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

      <button
        type="button"
        onClick={() => dispatch(startGame())}
        className="mb-8 rounded bg-white px-4 py-2 font-semibold text-black"
      >
        Start Game
      </button>

      <GameBoard />
    </div>
  );
};

export default GamePage;