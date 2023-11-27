import React from "react";
import { render, screen } from "@testing-library/react";
import WeatherForecastTable from "./WeatherForecastTable";
import { mockForecastData } from "@/app/components/WeatherForecastTable/mockData";
import "@testing-library/jest-dom";

describe("WeatherForecastTable", () => {
  it("renders the component with no data", () => {
    render(<WeatherForecastTable />);
    expect(screen.getByText("5-Day Weather Forecast")).toBeInTheDocument();
  });

  it("renders the component with forecast data", () => {
    render(<WeatherForecastTable forecastData={mockForecastData} />);

    expect(screen.getAllByTestId("day").length).toBe(mockForecastData.length);

    mockForecastData.forEach(data => {
      expect(screen.getByText(`${data.main.temp} °C`)).toBeInTheDocument();
    });
  });
});
