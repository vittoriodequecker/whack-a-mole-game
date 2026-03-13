import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import LeaderboardPage from "../pages/LeaderboardPage";
import * as leaderboardUtils from "../utils/leaderboard";

vi.mock("../utils/leaderboard", async () => {
  const actual = await vi.importActual("../utils/leaderboard");
  return {
    ...actual,
    getLeaderboard: vi.fn(),
  };
});

describe("LeaderboardPage", () => {
  it("should display a message when there are no scores", () => {
    vi.mocked(leaderboardUtils.getLeaderboard).mockReturnValue([]);

    render(
      <MemoryRouter>
        <LeaderboardPage />
      </MemoryRouter>
    );

    expect(screen.getByText(/leaderboard/i)).toBeInTheDocument();
    expect(screen.getByText(/no scores yet/i)).toBeInTheDocument();
    expect(
      screen.getByRole("link", { name: /back to game/i })
    ).toBeInTheDocument();
  });

  it("should render leaderboard entries", () => {
    vi.mocked(leaderboardUtils.getLeaderboard).mockReturnValue([
      { name: "Alice", score: 24 },
      { name: "Bob", score: 19 },
      { name: "Charlie", score: 15 },
    ]);

    render(
      <MemoryRouter>
        <LeaderboardPage />
      </MemoryRouter>
    );

    expect(screen.getByText("Alice")).toBeInTheDocument();
    expect(screen.getByText("Bob")).toBeInTheDocument();
    expect(screen.getByText("Charlie")).toBeInTheDocument();

    expect(screen.getByText(/24\s*pts/i)).toBeInTheDocument();
    expect(screen.getByText(/19\s*pts/i)).toBeInTheDocument();
    expect(screen.getByText(/15\s*pts/i)).toBeInTheDocument();
  });
});