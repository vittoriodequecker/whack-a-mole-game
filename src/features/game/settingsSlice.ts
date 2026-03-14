import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

type SettingsState = {
  rows: number;
  columns: number;
  moleIntervalMs: number;
};

const initialState: SettingsState = {
  rows: 3,
  columns: 4,
  moleIntervalMs: 800,
};

const settingsSlice = createSlice({
  name: "settings",
  initialState,
  reducers: {
    setRows: (state, action: PayloadAction<number>) => {
      state.rows = action.payload;
    },
    setColumns: (state, action: PayloadAction<number>) => {
      state.columns = action.payload;
    },
    setMoleIntervalMs: (state, action: PayloadAction<number>) => {
      state.moleIntervalMs = action.payload;
    },
    setGridSize: (
      state,
      action: PayloadAction<{ rows: number; columns: number }>
    ) => {
      state.rows = action.payload.rows;
      state.columns = action.payload.columns;
    },
    resetSettings: () => initialState,
  },
});

export const {
  setRows,
  setColumns,
  setMoleIntervalMs,
  setGridSize,
  resetSettings,
} = settingsSlice.actions;

export default settingsSlice.reducer;