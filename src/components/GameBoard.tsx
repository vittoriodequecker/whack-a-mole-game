import hole from "../assets/images/hole.png";

const GameBoard = () => {
  const holes = Array.from({ length: 12 });

  return (
    <div className="mt-12 grid grid-cols-4 gap-5 justify-center">
      {holes.map((_, index) => (
        <div key={index} className="w-[120px]">
          <img src={hole} alt="hole" className="w-full" />
        </div>
      ))}
    </div>
  );
};

export default GameBoard;