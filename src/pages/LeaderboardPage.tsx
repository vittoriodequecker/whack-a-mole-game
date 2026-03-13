import { Link } from "react-router-dom";
import { useMemo } from "react";
import { getLeaderboard } from "../utils/leaderboard";

const LeaderboardPage = () => {
  const leaderboard = useMemo(() => getLeaderboard(), []);

  return (
    <main className="flex min-h-screen flex-col items-center px-4 py-10 text-white">
      <h1 className="mb-8 text-4xl font-bold">Leaderboard</h1>

      <div className="w-full max-w-xl rounded-xl bg-black/50 p-6 shadow-lg">
        {leaderboard.length === 0 ? (
          <p className="text-center text-lg">No scores yet.</p>
        ) : (
          <ol className="space-y-3">
            {leaderboard.map((player, index) => (
              <li
                key={`${player.name}-${index}`}
                className="flex items-center justify-between rounded-lg bg-white/10 px-4 py-3"
              >
                <div className="flex items-center gap-4">
                  <span className="w-8 text-lg font-bold">#{index + 1}</span>
                  <span className="text-lg">{player.name}</span>
                </div>

                <span className="text-lg font-semibold">{player.score}</span>
              </li>
            ))}
          </ol>
        )}

        <div className="mt-8 flex justify-center">
          <Link
            to="/"
            className="rounded bg-white px-4 py-2 font-semibold text-black"
          >
            Back to game
          </Link>
        </div>
      </div>
    </main>
  );
};

export default LeaderboardPage;