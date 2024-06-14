import { render } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import SearchBox from "./SearchBox";

describe("SearchBox", () => {
  it("should display search box", () => {
    const { getByTestId } = render(<SearchBox />);
    const searchBoxContainer = getByTestId(/search--container/di);
    expect(searchBoxContainer).toBeInTheDocument();
  });

  it("able to type in search box", async () => {
    const { getByRole } = render(<SearchBox />);
    const inputComponent = getByRole("textbox", { name: /book search/i });
    expect(inputComponent).toBeInTheDocument();

    await userEvent.type(inputComponent, "Matrix");
    // verify the input value has changed
    expect(inputComponent).toHaveValue("Matrix");
  });
});
