import React, { useCallback, useEffect, useRef, useState } from "react";
import "./searchBox.css";
import { getBooks } from "../apis/booksAPI";
import { Book } from "../types/book";
import { debounce, throttle } from "../utils/utils";
import { useDebounce, useThrottle } from "../customHooks/customHooks";

const SearchBox = () => {
  const [searchValue, setSearchValue] = useState<string>("");
  const [bookList, setBookList] = useState<Book[]>([]);
  const [openMenu, setOpenMenu] = useState<boolean>(false);

  // useDebounce
  const debounceValue = useDebounce<string>(searchValue, 1000);
  // useThrottle
  const throttleValue = useThrottle<string>(searchValue, 1000);

  const fetchBooks = (inputValue: string | undefined) => {
    console.log("fetchbook", inputValue);
    setOpenMenu(true);
    if (inputValue) {
      getBooks(inputValue)
        .then((data) => {
          if (data) {
            setBookList([...data]);
          } else {
            setBookList([]);
          }
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      setBookList([]);
    }
  };

  useEffect(() => {
    fetchBooks(debounceValue);
  }, [debounceValue]);

  const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setOpenMenu(true);
    setSearchValue(e.target.value);
  };

  const itemOnClick = (newValue: string) => {
    setOpenMenu(false);
    setSearchValue(newValue);
  };

  return (
    <div
      className="search--container"
      data-testid="search--container"
      // style={{backgroundColor: "red"}}
    >
      <form className="search--container-form">
        <input
          className="search--form-input"
          type="text"
          id="book"
          name="book"
          onChange={(e) => {
            handleOnChange(e);
          }}
          onClick={() => setOpenMenu(true)}
          aria-label="Book Search"
        />
        {openMenu && bookList.length > 0 && (
          <div className="search--dropdown-container" 
          aria-label="Book Menu">
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
