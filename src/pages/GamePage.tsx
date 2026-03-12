import GameBoard from "../components/GameBoard";

const GamePage = () => {
  return (
    <div className="flex min-h-screen flex-col items-center">
      <h1 className="mt-10 mb-8 text-center text-4xl font-bold text-white">
        Whack-a-Mole
      </h1>
      <GameBoard />
    </div>
  );
};

export default GamePage;