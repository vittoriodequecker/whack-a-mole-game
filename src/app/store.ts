import { configureStore } from "@reduxjs/toolkit";
import gameReducer from "../features/game/gameSlice";
import settingsReducer from "../features/game/settingsSlice";

export const store = configureStore({
  reducer: {
    game: gameReducer,
    settings: settingsReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;