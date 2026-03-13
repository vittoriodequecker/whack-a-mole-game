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

export const saveScore = (name: string, score: number): LeaderboardEntry[] => {
  const leaderboard = getLeaderboard();

  const updatedLeaderboard = [...leaderboard, { name, score }]
    .sort((a, b) => b.score - a.score)
    .slice(0, 10);

  localStorage.setItem(LEADERBOARD_KEY, JSON.stringify(updatedLeaderboard));

  return updatedLeaderboard;
};