import { configureStore } from "@reduxjs/toolkit";
import bookReducer from "./reducers/Books/booksSlice";
import bookDetailReducer from "./reducers/BookDetail/BookDetailSlice";
import bookFilterReducer from "./reducers/BookFilter/BookFilterSlice";

export const store = configureStore({
  reducer: {
    book: bookReducer,
    bookDetail: bookDetailReducer,
    bookFilter: bookFilterReducer,
  },
});
