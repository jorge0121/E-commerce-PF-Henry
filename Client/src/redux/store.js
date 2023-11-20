import { configureStore } from "@reduxjs/toolkit";
import bookReducer from "./reducers/Books/booksSlice";
import bookDetailReducer from "./reducers/BookDetail/BookDetailSlice";

export const store = configureStore({
  reducer: { book: bookReducer, bookDetail: bookDetailReducer },
});
