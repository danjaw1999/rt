import { render, screen } from "@testing-library/react";
import { Input } from "./Input";
import "@testing-library/jest-dom";

describe("Input", () => {
  const mockOnChange = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("renders without crashing", () => {
    render(<Input value="" onChange={mockOnChange} />);
    expect(screen.getByRole("textbox")).toBeInTheDocument();
  });

  it("displays the provided placeholder", () => {
    const placeholder = "Enter text";
    render(
      <Input value="" onChange={mockOnChange} placeholder={placeholder} />,
    );
    expect(screen.getByPlaceholderText(placeholder)).toBeInTheDocument();
  });

  it("displays the provided label", () => {
    const label = "Username";
    render(<Input value="" onChange={mockOnChange} label={label} />);
    expect(screen.getByText(label)).toBeInTheDocument();
  });
});
