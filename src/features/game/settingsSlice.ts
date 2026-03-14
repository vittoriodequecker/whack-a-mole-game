import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

export const DEFAULT_ROWS = 3;
export const DEFAULT_COLUMNS = 4;
export const DEFAULT_MOLE_INTERVAL_MS = 800;
export const DEFAULT_GAME_DURATION_SECONDS = 120;

type SettingsState = {
  rows: number;
  columns: number;
  moleIntervalMs: number;
  gameDurationSeconds: number;
};

const initialState: SettingsState = {
  rows: DEFAULT_ROWS,
  columns: DEFAULT_COLUMNS,
  moleIntervalMs: DEFAULT_MOLE_INTERVAL_MS,
  gameDurationSeconds: DEFAULT_GAME_DURATION_SECONDS,
};

const settingsSlice = createSlice({
  name: "settings",
  initialState,
  reducers: {
    setGridSize: (
      state,
      action: PayloadAction<{ rows: number; columns: number }>
    ) => {
      state.rows = action.payload.rows;
      state.columns = action.payload.columns;
    },
    setMoleIntervalMs: (state, action: PayloadAction<number>) => {
      state.moleIntervalMs = action.payload;
    },
    setGameDurationSeconds: (state, action: PayloadAction<number>) => {
      state.gameDurationSeconds = action.payload;
    },
    resetSettings: () => initialState,
  },
});

export const {
  setGridSize,
  setMoleIntervalMs,
  setGameDurationSeconds,
  resetSettings,
} = settingsSlice.actions;

export default settingsSlice.reducer;