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
    resetGame: () => initialState,
  },
});

export const {
  startGame,
  endGame,
  resetGame,
} = gameSlice.actions;

export default gameSlice.reducer;