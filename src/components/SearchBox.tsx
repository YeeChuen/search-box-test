import React, { useState } from "react";
import "./searchBox.css";
import { getBooks } from "../apis/booksAPI";
import { Book } from "../types/book";
import { debounce } from "../utils/utils";

const SearchBox = () => {
  const [searchValue, setSearchValue] = useState<string>("");
  const [bookList, setBookList] = useState<Book[]>([]);

  console.log(bookList);

  const changeEvent = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.value) {
      await getBooks(e.target.value)
        .then((data) => {
          console.log(data);
          setBookList([...data]);
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      await setBookList([]);
    }
  };
  const debouncedSearch = debounce(changeEvent, 1000);
  const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchValue(e.target.value);
    debouncedSearch(e)
  }

  const itemOnClick = (newValue: string) => {
    setSearchValue(newValue);
  };

  return (
    <div className="search--container" data-testid="search--container">
      <form className="search--container-form">
        <input
          className="search--form-input"
          type="text"
          id="book"
          name="book"
          value={searchValue}
          onChange={(e) => handleOnChange(e)}
          aria-label="Book Search"
        />
        {bookList.length > 0 && (
          <div className="search--dropdown-container">
            {bookList.map((e, i) => {
              return (
                <div
                  key={e.id}
                  className="search--dropdown-item"
                  onClick={() => itemOnClick(e.volumeInfo.title)}
                >
                  {e.volumeInfo.title}
                </div>
              );
            })}
          </div>
        )}
      </form>
    </div>
  );
};

export default SearchBox;
