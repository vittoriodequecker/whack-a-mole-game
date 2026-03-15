import { render, screen, fireEvent, act } from "@testing-library/react";
import Mole from "../components/Mole";
import { vi, describe, it, expect, beforeEach, afterEach } from "vitest";

describe("Mole", () => {
  beforeEach(() => {
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.runOnlyPendingTimers();
    vi.useRealTimers();
  });

  it("renders hole and mole images", () => {
    render(<Mole isActive={false} onWhack={vi.fn()} />);

    expect(screen.getByAltText("hole")).toBeInTheDocument();
    expect(screen.getByAltText("mole")).toBeInTheDocument();
  });

  it("does not call onWhack when mole is inactive", () => {
    const onWhack = vi.fn();

    render(<Mole isActive={false} onWhack={onWhack} />);

    fireEvent.click(screen.getByRole("button"));

    expect(onWhack).not.toHaveBeenCalled();
    expect(screen.queryByAltText("hammer")).not.toBeInTheDocument();
  });

  it("shows hammer and calls onWhack immediately when mole is active", () => {
    const onWhack = vi.fn();

    render(<Mole isActive={true} onWhack={onWhack} />);

    fireEvent.click(screen.getByRole("button"));

    expect(screen.getByAltText("hammer")).toBeInTheDocument();
    expect(onWhack).toHaveBeenCalledTimes(1);

    act(() => {
      vi.advanceTimersByTime(200);
    });

    expect(screen.queryByAltText("hammer")).not.toBeInTheDocument();
  });

  it("prevents multiple hits while already whacked", () => {
    const onWhack = vi.fn();

    render(<Mole isActive={true} onWhack={onWhack} />);

    const button = screen.getByRole("button");

    fireEvent.click(button);
    fireEvent.click(button);
    fireEvent.click(button);

    act(() => {
      vi.advanceTimersByTime(200);
    });

    expect(onWhack).toHaveBeenCalledTimes(1);
  });
});