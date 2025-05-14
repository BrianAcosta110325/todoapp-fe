import React from "react";
import { render, screen } from "@testing-library/react";
import Metrics from "./Metrics";

describe("Metrics Component", () => {
  const props = {
    averageTimeDifference: "2 days",
    averageLowTimeDifference: "1 day",
    averageMediumTimeDifference: "2 days",
    averageHighTimeDifference: "4 days",
  };

  it("renders average time to finish tasks", () => {
    render(<Metrics {...props} />);
    
    expect(screen.getByText("Average time to finish tasks:")).toBeInTheDocument();
    expect(screen.getByText("2 days")).toBeInTheDocument();
  });

  it("renders average time by priority", () => {
    render(<Metrics {...props} />);
    
    expect(screen.getByText("Average time to finish task by priority:")).toBeInTheDocument();
    expect(screen.getByText("Low: 1 day")).toBeInTheDocument();
    expect(screen.getByText("Medium: 2 days")).toBeInTheDocument();
    expect(screen.getByText("High: 4 days")).toBeInTheDocument();
  });
});
