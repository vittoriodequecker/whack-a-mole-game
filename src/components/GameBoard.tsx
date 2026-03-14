import { useDispatch, useSelector } from "react-redux";
import type { RootState } from "../app/store";
import { whackMole } from "../features/game/gameSlice";
import Mole from "./Mole";

const GameBoard = () => {
  const dispatch = useDispatch();

  const activeMoleIndex = useSelector(
    (state: RootState) => state.game.activeMoleIndex
  );

  const { rows, columns } = useSelector((state: RootState) => state.settings);

  const totalMoles = rows * columns;
  const holes = Array.from({ length: totalMoles });

  return (
    <div
      className="mt-12 grid gap-5 justify-center"
      style={{ gridTemplateColumns: `repeat(${columns}, 120px)` }}
    >
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