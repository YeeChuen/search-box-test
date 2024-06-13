import { render } from "@testing-library/react";
// import userEvent from "@testing-library/user-event";
import SearchBox from "./SearchBox";
// import { getBooks } from "../apis/booksAPI";

// import fetchMock from "jest-fetch-mock";
// fetchMock.enableMocks();

/* 
1. test searchbox existance
2. test dropdown menu
3. test api call (mock)
*/

// beforeEach(() => {
//   //   global.fetch = jest.fn().mockImplementation(() => {
//   //     Promise.resolve({
//   //       json: () =>
//   //         Promise.resolve(
//   //           JSON.stringify([
//   //             { id: "1", volumeInfo: { title: "Matrix" } },
//   //             { id: "1", volumeInfo: { title: "The Matrix and Philosophy" } },
//   //           ])
//   //         ),
//   //     });
//   //   });

//   fetchMock.mockResponse(() => {
//     // Customize the mock response based on the request if needed
//     // For example, you can use different responses for different URLs

//     return Promise.resolve(
//       JSON.stringify([
//         { id: "1", volumeInfo: { title: "Matrix" } },
//         { id: "1", volumeInfo: { title: "The Matrix and Philosophy" } },
//       ])
//     );
//   });
// });

// afterEach(() => {
//   //   jest.resetAllMocks();
//   fetchMock.resetMocks(); // Reset mocks after each test to avoid test pollution
// });

describe("SearchBox", () => {
  it("should display search box", () => {
    const { getByTestId } = render(<SearchBox />);
    const searchBoxContainer = getByTestId(/search--container/di);
    expect(searchBoxContainer).toBeInTheDocument();
  });

  //   it("able to type in search box", async () => {
  //     const { getByRole } = render(<SearchBox />);
  //     const inputComponent = getByRole("textbox", { name: /book search/i });
  //     expect(inputComponent).toBeInTheDocument();

  //     await userEvent.type(inputComponent, "Matrix");
  //     // verify the input value has changed
  //     expect(inputComponent).toHaveValue("Matrix");
  //   });

//   it("get books API", async () => {
//     const books = await getBooks("matrix");
//     expect(books).toEqual([
//       { id: "1", volumeInfo: { title: "Matrix" } },
//       { id: "1", volumeInfo: { title: "The Matrix and Philosophy" } },
//     ]);
//     expect(fetchMock).toHaveBeenCalledTimes(1);
//   });

  it("display result in dropdown menu on input value change", () => {});
});
