import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import type { RootState } from "../app/store";
import {
  setGridSize,
  setMoleIntervalMs,
  setGameDurationSeconds,
  resetSettings,
} from "../features/game/settingsSlice";
import { setTimeLeft } from "../features/game/gameSlice";

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

  const { rows, columns, moleIntervalMs, gameDurationSeconds } = useSelector(
    (state: RootState) => state.settings
  );

  const [localGrid, setLocalGrid] = useState(`${rows}x${columns}`);
  const [localSpeed, setLocalSpeed] = useState(String(moleIntervalMs));
  const [localDuration, setLocalDuration] = useState(String(gameDurationSeconds));

  useEffect(() => {
    if (!isOpen) return;

    setLocalGrid(`${rows}x${columns}`);
    setLocalSpeed(String(moleIntervalMs));
    setLocalDuration(String(gameDurationSeconds));
  }, [isOpen, rows, columns, moleIntervalMs, gameDurationSeconds]);

  if (!isOpen) return null;

  const handleSave = () => {
    const [nextRows, nextColumns] = localGrid.split("x").map(Number);
    const nextSpeed = Number(localSpeed);
    const nextDuration = Number(localDuration);

    dispatch(setGridSize({ rows: nextRows, columns: nextColumns }));
    dispatch(setMoleIntervalMs(nextSpeed));
    dispatch(setGameDurationSeconds(nextDuration));

    if (!disabled) {
      dispatch(setTimeLeft(nextDuration));
    }

    onClose();
  };

  const handleReset = () => {
    dispatch(resetSettings());

    if (!disabled) {
      dispatch(setTimeLeft(120));
    }

    onClose();
  };

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
              value={localGrid}
              disabled={disabled}
              onChange={(e) => setLocalGrid(e.target.value)}
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
              value={localSpeed}
              disabled={disabled}
              onChange={(e) => setLocalSpeed(e.target.value)}
              className="w-full rounded-lg border border-gray-300 px-3 py-2 disabled:cursor-not-allowed disabled:bg-gray-100"
            >
              <option value="1200">Slow</option>
              <option value="800">Normal</option>
              <option value="500">Fast</option>
            </select>
          </div>

          <div>
            <label htmlFor="game-duration" className="mb-2 block font-semibold">
              Game duration
            </label>
            <select
              id="game-duration"
              value={localDuration}
              disabled={disabled}
              onChange={(e) => setLocalDuration(e.target.value)}
              className="w-full rounded-lg border border-gray-300 px-3 py-2 disabled:cursor-not-allowed disabled:bg-gray-100"
            >
              <option value="30">30 seconds</option>
              <option value="60">1 minute</option>
              <option value="120">2 minutes</option>
              <option value="180">3 minutes</option>
            </select>
          </div>

          <div className="flex justify-between pt-2">
            <button
              type="button"
              onClick={handleReset}
              disabled={disabled}
              className="rounded-lg bg-gray-200 px-4 py-2 font-semibold disabled:cursor-not-allowed disabled:opacity-50"
            >
              Reset settings
            </button>

            <button
              type="button"
              onClick={handleSave}
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