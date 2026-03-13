import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { Provider } from "react-redux";
import { store } from "../app/store";
import GameBoard from "../components/GameBoard";

describe("GameBoard", () => {
  it("should render 12 mole holes", () => {
    render(
      <Provider store={store}>
        <GameBoard />
      </Provider>
    );

    const holes = screen.getAllByRole("button");
    expect(holes).toHaveLength(12);
  });
});