import { Link } from "react-router-dom";
import { useMemo } from "react";
import { getLeaderboard } from "../utils/leaderboard";

const LeaderboardPage = () => {
  const leaderboard = useMemo(() => getLeaderboard(), []);

  const first = leaderboard[0];
  const second = leaderboard[1];
  const third = leaderboard[2];
  const others = leaderboard.slice(3);

  return (
    <main className="flex min-h-screen items-center justify-center px-4 py-4 text-white">
      <div className="w-full max-w-5xl rounded-3xl border border-white/10 bg-black/60 p-4 shadow-2xl backdrop-blur-sm">
        <div className="mb-4 text-center">
          <p className="text-xs font-semibold uppercase tracking-[0.3em] text-yellow-300">
            Hall of Fame
          </p>
          <h1 className="mt-1 text-3xl font-black tracking-wide sm:text-4xl">
            Leaderboard
          </h1>
        </div>

        {leaderboard.length === 0 ? (
          <div className="rounded-2xl border border-dashed border-white/20 bg-white/5 px-6 py-8 text-center">
            <p className="text-lg font-semibold">No scores yet</p>
            <p className="mt-2 text-white/70">
              Play a game and become the first champion.
            </p>
          </div>
        ) : (
          <>
            <div className="mb-5 grid grid-cols-3 items-end gap-3">
              <div className="flex flex-col items-center">
                {second ? (
                  <>
                    <div className="mb-2 text-center">
                      <p className="max-w-[110px] truncate text-sm font-semibold">
                        {second.name}
                      </p>
                      <p className="text-xs text-white/70">{second.score} pts</p>
                    </div>
                    <div className="flex h-24 w-full flex-col items-center justify-center rounded-2xl border border-slate-200/30 bg-slate-200/15 px-2 shadow-lg">
                      <span className="mb-1 flex h-8 w-8 items-center justify-center rounded-full bg-slate-200 text-sm font-bold text-black">
                        #2
                      </span>
                      <span className="text-xs font-medium uppercase tracking-wider text-slate-200">
                        Runner-up
                      </span>
                    </div>
                  </>
                ) : (
                  <div className="h-24 w-full rounded-2xl border border-white/10 bg-white/5" />
                )}
              </div>

              <div className="flex flex-col items-center">
                {first ? (
                  <>
                    <div className="mb-2 text-center">
                      <p className="max-w-[110px] truncate text-base font-bold text-yellow-200">
                        {first.name}
                      </p>
                      <p className="text-sm text-white/80">{first.score} pts</p>
                    </div>
                    <div className="flex h-32 w-full flex-col items-center justify-center rounded-2xl border border-yellow-300/40 bg-yellow-400/20 px-2 shadow-xl">
                      <span className="mb-1 flex h-9 w-9 items-center justify-center rounded-full bg-yellow-300 text-sm font-black text-black">
                        #1
                      </span>
                      <span className="text-xs font-bold uppercase tracking-[0.2em] text-yellow-200">
                        Champion
                      </span>
                    </div>
                  </>
                ) : (
                  <div className="h-32 w-full rounded-2xl border border-white/10 bg-white/5" />
                )}
              </div>

              <div className="flex flex-col items-center">
                {third ? (
                  <>
                    <div className="mb-2 text-center">
                      <p className="max-w-[110px] truncate text-sm font-semibold">
                        {third.name}
                      </p>
                      <p className="text-xs text-white/70">{third.score} pts</p>
                    </div>
                    <div className="flex h-20 w-full flex-col items-center justify-center rounded-2xl border border-amber-700/40 bg-amber-700/20 px-2 shadow-lg">
                      <span className="mb-1 flex h-8 w-8 items-center justify-center rounded-full bg-amber-700 text-sm font-bold text-white">
                        #3
                      </span>
                      <span className="text-xs font-medium uppercase tracking-wider text-amber-300">
                        Third
                      </span>
                    </div>
                  </>
                ) : (
                  <div className="h-20 w-full rounded-2xl border border-white/10 bg-white/5" />
                )}
              </div>
            </div>

            {others.length > 0 && (
              <div className="rounded-2xl border border-white/10 bg-white/5 p-3">
                <div className="mb-2 flex items-center justify-between px-2 text-xs font-semibold uppercase tracking-wider text-white/60">
                  <span>Rank</span>
                  <span>Player</span>
                  <span>Score</span>
                </div>

                <ol className="space-y-2">
                  {others.map((player, index) => (
                    <li
                      key={`${player.name}-${index + 3}`}
                      className="grid grid-cols-[60px_1fr_70px] items-center rounded-xl bg-white/8 px-3 py-2"
                    >
                      <span className="text-sm font-bold text-white/80">
                        #{index + 4}
                      </span>
                      <span className="truncate text-sm font-medium">
                        {player.name}
                      </span>
                      <span className="text-right text-sm font-bold">
                        {player.score}
                      </span>
                    </li>
                  ))}
                </ol>
              </div>
            )}
          </>
        )}

        <div className="mt-4 flex justify-center">
          <Link
            to="/"
            className="rounded-xl bg-white px-5 py-2.5 font-semibold text-black shadow-md transition hover:scale-105 hover:bg-yellow-300"
          >
            Back to game
          </Link>
        </div>
      </div>
    </main>
  );
};

export default LeaderboardPage;