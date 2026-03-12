import hole from "../assets/images/hole.png";
import mole from "../assets/images/mole.png";
import { useDispatch, useSelector } from "react-redux";
import type { RootState } from "../app/store";
import { whackMole } from "../features/game/gameSlice";

const GameBoard = () => {
  const dispatch = useDispatch();
  const activeMoleIndex = useSelector(
    (state: RootState) => state.game.activeMoleIndex
  );

  const holes = Array.from({ length: 12 });

  return (
    <div className="mt-12 grid grid-cols-4 gap-5 justify-center">
      {holes.map((_, index) => {
        const isActive = activeMoleIndex === index;

        return (
          <button
            key={index}
            type="button"
            onClick={() => dispatch(whackMole(index))}
            className="relative h-[120px] w-[120px]"
          >
            <img
              src={hole}
              alt="hole"
              className="absolute inset-0 h-full w-full"
            />

            {isActive && (
              <img
                src={mole}
                alt="mole"
                className="absolute inset-0 h-full w-full"
              />
            )}
          </button>
        );
      })}
    </div>
  );
};

export default GameBoard;