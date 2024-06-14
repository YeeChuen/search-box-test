import React, { useEffect, useRef, useState } from "react";
import "./searchBox.css";
import { getBooks } from "../apis/booksAPI";
import { Book } from "../types/book";
import { debounce } from "../utils/utils";

const SearchBox = () => {
  const [searchValue, setSearchValue] = useState<string>("");
  const [bookList, setBookList] = useState<Book[]>([]);

  const inputRef = useRef<HTMLInputElement>(null);

  const changeEvent = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (inputRef.current?.value) {
      getBooks(inputRef.current?.value)
        .then((data) => {
          console.log(data);
          setBookList([...data]);
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      setBookList([]);
    }
  };
  const debouncedSearch = debounce(changeEvent, 300);

  const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    debouncedSearch(e);
  };

  const itemOnClick = (newValue: string) => {
    if (inputRef.current) inputRef.current.value = newValue
  };

  return (
    <div className="search--container" data-testid="search--container">
      <form className="search--container-form">
        <input
          className="search--form-input"
          type="text"
          id="book"
          name="book"
          ref = {inputRef}
          onChange={(e) => {
            handleOnChange(e)
          }}
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
