import type { PayloadAction } from "@reduxjs/toolkit";
import { createSlice } from "@reduxjs/toolkit";

export const DEFAULT_SCORE = 0;
export const DEFAULT_TIMELEFT = 120;
export const DEFAULT_STATUS = "Ready to Play";

type GameStatus = "Ready to Play" | "playing" | "finished";

type GameState = {
  score: number;
  timeLeft: number;
  activeMoleIndex: number | null;
  status: GameStatus;
};

const initialState: GameState = {
  score: DEFAULT_SCORE,
  timeLeft: DEFAULT_TIMELEFT,
  activeMoleIndex: null,
  status: DEFAULT_STATUS,
};

const gameSlice = createSlice({
  name: "game",
  initialState,
  reducers: {
    startGame: (state, action: PayloadAction<number>) => {
      state.score = DEFAULT_SCORE;
      state.timeLeft = action.payload;
      state.activeMoleIndex = null;
      state.status = "playing";
    },
    endGame: (state) => {
      state.status = "finished";
      state.activeMoleIndex = null;
    },
    setActiveMole: (state, action: PayloadAction<number | null>) => {
      state.activeMoleIndex = action.payload;
    },
    setTimeLeft: (state, action: PayloadAction<number>) => {
      state.timeLeft = action.payload;
    },
    decreaseTime: (state) => {
      if (state.timeLeft > 0) {
        state.timeLeft -= 1;
      }

      if (state.timeLeft === 0) {
        state.status = "finished";
        state.activeMoleIndex = null;
      }
    },
    whackMole: (state, action: PayloadAction<number>) => {
      if (
        state.status === "playing" &&
        state.activeMoleIndex === action.payload
      ) {
        state.score += 1;
        state.activeMoleIndex = null;
      }
    },
    resetGame: () => initialState,
  },
});

export const {
  startGame,
  endGame,
  setActiveMole,
  setTimeLeft,
  decreaseTime,
  whackMole,
  resetGame,
} = gameSlice.actions;

export default gameSlice.reducer;