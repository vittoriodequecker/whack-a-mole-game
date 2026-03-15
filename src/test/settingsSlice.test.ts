import settingsReducer, {
  DEFAULT_ROWS,
  DEFAULT_COLUMNS,
  DEFAULT_MOLE_INTERVAL_MS,
  DEFAULT_GAME_DURATION_SECONDS,
  setGridSize,
  setMoleIntervalMs,
  setGameDurationSeconds,
  resetSettings,
} from "../features/game/settingsSlice";

describe("settingsSlice", () => {
  it("should return the initial state", () => {
    const state = settingsReducer(undefined, { type: "unknown" });

    expect(state).toEqual({
      rows: DEFAULT_ROWS,
      columns: DEFAULT_COLUMNS,
      moleIntervalMs: DEFAULT_MOLE_INTERVAL_MS,
      gameDurationSeconds: DEFAULT_GAME_DURATION_SECONDS,
    });
  });

  it("should update grid size", () => {
    const previousState = {
      rows: DEFAULT_ROWS,
      columns: DEFAULT_COLUMNS,
      moleIntervalMs: DEFAULT_MOLE_INTERVAL_MS,
      gameDurationSeconds: DEFAULT_GAME_DURATION_SECONDS,
    };

    const state = settingsReducer(
      previousState,
      setGridSize({ rows: 4, columns: 5 })
    );

    expect(state.rows).toBe(4);
    expect(state.columns).toBe(5);
    expect(state.moleIntervalMs).toBe(DEFAULT_MOLE_INTERVAL_MS);
    expect(state.gameDurationSeconds).toBe(DEFAULT_GAME_DURATION_SECONDS);
  });

  it("should update mole interval", () => {
    const previousState = {
      rows: DEFAULT_ROWS,
      columns: DEFAULT_COLUMNS,
      moleIntervalMs: DEFAULT_MOLE_INTERVAL_MS,
      gameDurationSeconds: DEFAULT_GAME_DURATION_SECONDS,
    };

    const state = settingsReducer(previousState, setMoleIntervalMs(500));

    expect(state.rows).toBe(DEFAULT_ROWS);
    expect(state.columns).toBe(DEFAULT_COLUMNS);
    expect(state.moleIntervalMs).toBe(500);
    expect(state.gameDurationSeconds).toBe(DEFAULT_GAME_DURATION_SECONDS);
  });

  it("should update game duration", () => {
    const previousState = {
      rows: DEFAULT_ROWS,
      columns: DEFAULT_COLUMNS,
      moleIntervalMs: DEFAULT_MOLE_INTERVAL_MS,
      gameDurationSeconds: DEFAULT_GAME_DURATION_SECONDS,
    };

    const state = settingsReducer(previousState, setGameDurationSeconds(60));

    expect(state.rows).toBe(DEFAULT_ROWS);
    expect(state.columns).toBe(DEFAULT_COLUMNS);
    expect(state.moleIntervalMs).toBe(DEFAULT_MOLE_INTERVAL_MS);
    expect(state.gameDurationSeconds).toBe(60);
  });

  it("should reset settings to default values", () => {
    const previousState = {
      rows: 5,
      columns: 6,
      moleIntervalMs: 400,
      gameDurationSeconds: 30,
    };

    const state = settingsReducer(previousState, resetSettings());

    expect(state).toEqual({
      rows: DEFAULT_ROWS,
      columns: DEFAULT_COLUMNS,
      moleIntervalMs: DEFAULT_MOLE_INTERVAL_MS,
      gameDurationSeconds: DEFAULT_GAME_DURATION_SECONDS,
    });
  });
});