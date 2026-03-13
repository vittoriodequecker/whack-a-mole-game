import { describe, it, expect, beforeEach } from "vitest";
import { getLeaderboard, saveScore } from "../utils/leaderboard";

describe("leaderboard utils", () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it("should return an empty array when leaderboard is empty", () => {
    expect(getLeaderboard()).toEqual([]);
  });

  it("should save a score and sort leaderboard in descending order", () => {
    saveScore("Alice", 12);
    saveScore("Bob", 24);
    saveScore("Charlie", 18);

    expect(getLeaderboard()).toEqual([
      { name: "Bob", score: 24 },
      { name: "Charlie", score: 18 },
      { name: "Alice", score: 12 },
    ]);
  });

  it("should keep only the top 10 scores", () => {
    for (let i = 1; i <= 12; i++) {
      saveScore(`Player ${i}`, i);
    }

    const leaderboard = getLeaderboard();

    expect(leaderboard).toHaveLength(10);
    expect(leaderboard[0]).toEqual({ name: "Player 12", score: 12 });
    expect(leaderboard[9]).toEqual({ name: "Player 3", score: 3 });
  });
});