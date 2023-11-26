import { render, screen, fireEvent } from "@testing-library/react";
import { Search } from "./Search";
import "@testing-library/jest-dom";

describe("Search component", () => {
  test("renders Search component with input field and placeholder", () => {
    const setCityMock = jest.fn();
    render(<Search city="London" setCity={setCityMock} />);

    const inputField = screen.getByPlaceholderText("Type name of city");
    expect(inputField).toBeInTheDocument();
    expect(inputField).toHaveValue("London");
  });

  test("calls setCity when input value changes", () => {
    const setCityMock = jest.fn();
    render(<Search city="London" setCity={setCityMock} />);

    fireEvent.change(screen.getByPlaceholderText("Type name of city"), {
      target: { value: "Paris" },
    });

    expect(setCityMock).toHaveBeenCalledWith("Paris");
  });
});
