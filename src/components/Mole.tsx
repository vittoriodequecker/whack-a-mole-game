import { useEffect, useState } from "react";
import hole from "../assets/images/hole.png";
import mole from "../assets/images/mole.png";
import hammer from "../assets/images/hammer.png";

type MoleProps = {
  isActive: boolean;
  onWhack: () => void;
};

const Mole = ({ isActive, onWhack }: MoleProps) => {
  const [isWhacked, setIsWhacked] = useState(false);
  const [showHammer, setShowHammer] = useState(false);

  useEffect(() => {
    if (isActive) {
      setIsWhacked(false);
    }
  }, [isActive]);

  const handleClick = () => {
    if (!isActive || isWhacked) return;

    setShowHammer(true);
    setIsWhacked(true);

    setTimeout(() => {
        onWhack();
        setShowHammer(false);
    }, 200);
  };

  return (
    <button
      type="button"
      onClick={handleClick}
      className="relative h-[120px] w-[120px]"
    >
        <div className="relative h-full w-full overflow-hidden">
            <img
                src={mole}
                alt="mole"
                className={`absolute inset-0 z-20 h-full w-full transition-all duration-200 ease-out ${
                isActive ? "" : "translate-y-full scale-100"
                } ${
                isWhacked ? "translate-y-3 scale-75 rotate-12 opacity-80" : ""
                }`}
            />

            <img
                src={hole}
                alt="hole"
                className="absolute inset-0 z-10 h-full w-full"
            />
        </div>

      {showHammer && (
        <img
        src={hammer}
        alt="hammer"
        className="absolute z-30 w-[90px] -top-8 left-6 rotate-[-40deg] animate-hammer"
        />
      )}
    </button>
  );
};

export default Mole;