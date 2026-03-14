import { useDispatch, useSelector } from "react-redux";
import type { RootState } from "../app/store";
import {
  setGridSize,
  setMoleIntervalMs,
  resetSettings,
} from "../features/game/settingsSlice";

type SettingsModalProps = {
  isOpen: boolean;
  onClose: () => void;
  disabled?: boolean;
};

const SettingsModal = ({
  isOpen,
  onClose,
  disabled = false,
}: SettingsModalProps) => {
  const dispatch = useDispatch();

  const { rows, columns, moleIntervalMs } = useSelector(
    (state: RootState) => state.settings
  );

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 px-4">
      <div className="w-full max-w-md rounded-2xl bg-white p-6 text-black shadow-2xl">
        <div className="mb-5 flex items-center justify-between">
          <h2 className="text-2xl font-bold">Game settings</h2>
          <button
            type="button"
            onClick={onClose}
            className="rounded bg-gray-200 px-3 py-1 font-semibold"
          >
            Close
          </button>
        </div>

        <div className="space-y-4">
          <div>
            <label htmlFor="grid-size" className="mb-2 block font-semibold">
              Grid size
            </label>
            <select
              id="grid-size"
              value={`${rows}x${columns}`}
              disabled={disabled}
              onChange={(e) => {
                const [nextRows, nextColumns] = e.target.value
                  .split("x")
                  .map(Number);

                dispatch(
                  setGridSize({
                    rows: nextRows,
                    columns: nextColumns,
                  })
                );
              }}
              className="w-full rounded-lg border border-gray-300 px-3 py-2 disabled:cursor-not-allowed disabled:bg-gray-100"
            >
              <option value="3x4">3 x 4</option>
              <option value="4x4">4 x 4</option>
              <option value="5x4">5 x 4</option>
            </select>
          </div>

          <div>
            <label htmlFor="mole-speed" className="mb-2 block font-semibold">
              Mole speed
            </label>
            <select
              id="mole-speed"
              value={String(moleIntervalMs)}
              disabled={disabled}
              onChange={(e) => dispatch(setMoleIntervalMs(Number(e.target.value)))}
              className="w-full rounded-lg border border-gray-300 px-3 py-2 disabled:cursor-not-allowed disabled:bg-gray-100"
            >
              <option value="1200">Slow</option>
              <option value="800">Normal</option>
              <option value="500">Fast</option>
            </select>
          </div>

          <div className="flex justify-between pt-2">
            <button
              type="button"
              onClick={() => dispatch(resetSettings())}
              disabled={disabled}
              className="rounded-lg bg-gray-200 px-4 py-2 font-semibold disabled:cursor-not-allowed disabled:opacity-50"
            >
              Reset settings
            </button>

            <button
              type="button"
              onClick={onClose}
              className="rounded-lg bg-black px-4 py-2 font-semibold text-white"
            >
              Save
            </button>
          </div>

          {disabled && (
            <p className="text-sm text-red-500">
              Settings cannot be changed while a game is in progress.
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default SettingsModal;