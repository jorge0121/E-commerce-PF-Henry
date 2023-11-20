import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  books: [],
  booksCopia: [],
};

export const bookSlice = createSlice({
  name: "book",
  initialState,
  reducers: {
    setBook: (state, action) => {
      state.books = action.payload;
    },
    setBookCopia: (state, action) => {
      state.booksCopia = action.payload;
    },
  },
});

export const { setBook, setBookCopia } = bookSlice.actions;
export default bookSlice.reducer;
