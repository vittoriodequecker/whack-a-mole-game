import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

type SettingsState = {
  rows: number;
  columns: number;
  moleIntervalMs: number;
  gameDurationSeconds: number;
};

const initialState: SettingsState = {
  rows: 3,
  columns: 4,
  moleIntervalMs: 800,
  gameDurationSeconds: 120,
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