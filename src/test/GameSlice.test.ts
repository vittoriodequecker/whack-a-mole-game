import { describe, it, expect } from "vitest";
import gameReducer, {
  startGame,
  setActiveMole,
  whackMole,
  decreaseTime,
  resetGame,
} from "../features/game/gameSlice";

describe("gameSlice", () => {
  it("should return the initial state", () => {
    const state = gameReducer(undefined, { type: "unknown" });

    expect(state).toEqual({
      score: 0,
      timeLeft: 120,
      activeMoleIndex: null,
      status: "Ready to Play",
    });
  });

  it("should start the game", () => {
    const previousState = {
      score: 5,
      timeLeft: 80,
      activeMoleIndex: 3,
      status: "finished" as const,
    };

    const state = gameReducer(previousState, startGame());

    expect(state).toEqual({
      score: 0,
      timeLeft: 120,
      activeMoleIndex: null,
      status: "playing",
    });
  });

  it("should set an active mole", () => {
    const state = gameReducer(undefined, setActiveMole(4));

    expect(state.activeMoleIndex).toBe(4);
  });

  it("should increase score when hitting the active mole during play", () => {
    const previousState = {
      score: 0,
      timeLeft: 120,
      activeMoleIndex: 4,
      status: "playing" as const,
    };

    const state = gameReducer(previousState, whackMole(4));

    expect(state.score).toBe(1);
    expect(state.activeMoleIndex).toBe(null);
  });

  it("should not increase score when hitting the wrong mole", () => {
    const previousState = {
      score: 0,
      timeLeft: 120,
      activeMoleIndex: 4,
      status: "playing" as const,
    };

    const state = gameReducer(previousState, whackMole(2));

    expect(state.score).toBe(0);
    expect(state.activeMoleIndex).toBe(4);
  });

  it("should decrease time by one second", () => {
    const previousState = {
      score: 0,
      timeLeft: 120,
      activeMoleIndex: 1,
      status: "playing" as const,
    };

    const state = gameReducer(previousState, decreaseTime());

    expect(state.timeLeft).toBe(119);
  });

  it("should finish the game when time reaches zero", () => {
    const previousState = {
      score: 3,
      timeLeft: 1,
      activeMoleIndex: 1,
      status: "playing" as const,
    };

    const state = gameReducer(previousState, decreaseTime());

    expect(state.timeLeft).toBe(0);
    expect(state.status).toBe("finished");
    expect(state.activeMoleIndex).toBe(null);
  });

  it("should reset the game", () => {
    const previousState = {
      score: 10,
      timeLeft: 55,
      activeMoleIndex: 8,
      status: "playing" as const,
    };

    const state = gameReducer(previousState, resetGame());

    expect(state).toEqual({
      score: 0,
      timeLeft: 120,
      activeMoleIndex: null,
      status: "Ready to Play",
    });
  });
});