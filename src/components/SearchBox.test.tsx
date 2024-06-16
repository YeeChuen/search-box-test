import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import SearchBox from "./SearchBox";

import { getBooks } from "../apis/booksAPI";

const mockBooks = {
  items: [
    {
      id: "1",
      volumeInfo: {
        title: "Book 1",
      },
    },
    {
      id: "2",
      volumeInfo: {
        title: "Book 2",
      },
    },
  ],
};

beforeEach(() => {
  jest.spyOn(global, "fetch").mockImplementation(
    () =>
      Promise.resolve({
        json: () => Promise.resolve(mockBooks),
      }) as Promise<Response>
  );
});

describe("SearchBox", () => {
  it("should display search box", () => {
    const { getByTestId } = render(<SearchBox />);
    const searchBoxContainer = getByTestId(/search--container/di);
    expect(searchBoxContainer).toBeInTheDocument();
  });

  it("able to type in search box", async () => {
    render(<SearchBox />);
    const inputComponent = screen.getByRole("textbox", {
      name: /book search/i,
    });
    expect(inputComponent).toBeInTheDocument();

    fireEvent.change(inputComponent, { target: { value: "Book" } });
    expect(inputComponent).toHaveValue("Book");

  });

  it("check API call", async () => {
    const data = await getBooks("Book");
    expect(data).toEqual(mockBooks.items);
  });
});
