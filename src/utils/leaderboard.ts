export type LeaderboardEntry = {
  name: string;
  score: number;
};

const LEADERBOARD_KEY = "leaderboard";

export const getLeaderboard = (): LeaderboardEntry[] => {
  const stored = localStorage.getItem(LEADERBOARD_KEY);

  if (!stored) return [];

  try {
    return JSON.parse(stored) as LeaderboardEntry[];
  } catch (error) {
    console.error("Failed to parse leaderboard:", error);
    return [];
  }
};

export const getRank = (score: number): number | null => {
  const leaderboard = getLeaderboard();

  const projectedLeaderboard = [...leaderboard, { name: "__preview__", score }]
    .sort((a, b) => b.score - a.score)
    .slice(0, 10);

  const rank = projectedLeaderboard.findIndex(
    (entry) => entry.name === "__preview__" && entry.score === score
  );

  return rank === -1 ? null : rank + 1;
};

export const saveScore = (name: string, score: number): LeaderboardEntry[] => {
  const leaderboard = getLeaderboard();

  const updatedLeaderboard = [...leaderboard, { name, score }]
    .sort((a, b) => b.score - a.score)
    .slice(0, 10);

  localStorage.setItem(LEADERBOARD_KEY, JSON.stringify(updatedLeaderboard));

  return updatedLeaderboard;
};