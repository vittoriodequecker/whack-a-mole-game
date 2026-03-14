type NameModalProps = {
  isOpen: boolean;
  score: number | null;
  playerName: string;
  onChangePlayerName: (value: string) => void;
  onSkip: () => void;
  onSave: () => void;
};

const NameModal = ({
  isOpen,
  score,
  playerName,
  onChangePlayerName,
  onSkip,
  onSave,
}: NameModalProps) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 px-4">
      <div className="w-full max-w-md rounded-2xl bg-white p-6 shadow-2xl">
        <h2 className="mb-4 text-2xl font-bold text-black">Save your score</h2>

        <p className="mb-4 text-gray-700">
          Your score: <span className="font-semibold">{score}</span>
        </p>

        <input
          type="text"
          value={playerName}
          onChange={(e) => onChangePlayerName(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              onSave();
            }
          }}
          placeholder="Enter your name"
          maxLength={20}
          className="mb-4 w-full rounded-lg border border-gray-300 px-4 py-2 text-black outline-none focus:border-black"
        />

        <div className="flex justify-end gap-3">
          <button
            type="button"
            onClick={onSkip}
            className="rounded-lg bg-gray-200 px-4 py-2 font-semibold text-black"
          >
            Skip
          </button>

          <button
            type="button"
            onClick={onSave}
            className="rounded-lg bg-black px-4 py-2 font-semibold text-white"
          >
            Save score
          </button>
        </div>
      </div>
    </div>
  );
};

export default NameModal;