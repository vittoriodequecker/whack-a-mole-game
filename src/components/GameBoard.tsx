import hole from "../assets/images/hole.png";

const GameBoard = () => {
  const holes = Array.from({ length: 12 });

  return (
    <div className="grid grid-cols-4 gap-5 mt-12 justify-center">
      {holes.map((_, index) => {
        return (
          <button
            key={index}
            className="relative w-[120px] h-[120px]"
          >
            <img
              src={hole}
              alt="hole"
              className="absolute inset-0 w-full h-full"
            />
          </button>
        );
      })}
    </div>
  );
};

export default GameBoard;