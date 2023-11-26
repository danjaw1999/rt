import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { Searcher } from "./Searcher";
import "@testing-library/jest-dom";

jest.mock("react-hot-toast", () => ({
  toast: {
    error: jest.fn(),
  },
}));

jest.mock("../../../app/api/queries/weather/useWeatherByCity", () => ({
  useWeatherByCity: jest.fn(() => ({
    data: null,
    isLoading: false,
    refetch: jest.fn(),
  })),
}));

jest.mock("../../../app/api/queries/weather/useWeatherByGeo", () => ({
  useWeatherByGeo: jest.fn(() => ({
    data: null,
    isLoading: false,
  })),
}));

jest.mock("../../../app/hooks/useGeoLocation", () => ({
  useCurrentLocation: jest.fn(() => ({
    location: { latitude: 51.5074, longitude: -0.1278 },
    hasPermission: true,
  })),
}));

describe("Searcher Component", () => {
  test("renders Searcher component", () => {
    render(<Searcher />);
    expect(screen.getByText("Add")).toBeInTheDocument();
  });

  test("handles city input change", async () => {
    render(<Searcher />);
    const input = screen.getByRole("textbox") as HTMLInputElement;
    await userEvent.type(input, "London");
    expect(input.value).toBe("London");
  });
});
