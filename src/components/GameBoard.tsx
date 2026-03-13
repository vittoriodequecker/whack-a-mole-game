import { useDispatch, useSelector } from "react-redux";
import type { RootState } from "../app/store";
import { whackMole } from "../features/game/gameSlice";
import Mole from "./Mole";

const GameBoard = () => {
  const dispatch = useDispatch();
  const activeMoleIndex = useSelector(
    (state: RootState) => state.game.activeMoleIndex
  );

  const holes = Array.from({ length: 12 });

  return (
    <div className="mt-12 grid grid-cols-4 gap-5 justify-center">
      {holes.map((_, index) => (
        <Mole
          key={index}
          isActive={activeMoleIndex === index}
          onWhack={() => dispatch(whackMole(index))}
        />
      ))}
    </div>
  );
};

export default GameBoard;