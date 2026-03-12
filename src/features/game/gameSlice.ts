import type { PayloadAction } from "@reduxjs/toolkit";
import { createSlice } from "@reduxjs/toolkit";

type GameStatus = "Ready to Play" | "playing" | "finished";

type GameState = {
  score: number;
  timeLeft: number;
  activeMoleIndex: number | null;
  status: GameStatus;
};

const initialState: GameState = {
  score: 0,
  timeLeft: 120,
  activeMoleIndex: null,
  status: "Ready to Play",
};

const gameSlice = createSlice({
  name: "game",
  initialState,
  reducers: {
    startGame: (state) => {
      state.score = 0;
      state.timeLeft = 120;
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
  decreaseTime,
  whackMole,
  resetGame,
} = gameSlice.actions;

export default gameSlice.reducer;