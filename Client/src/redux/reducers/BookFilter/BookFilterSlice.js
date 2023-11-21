import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  author: "",
  year: "",
  gender: "",
};

export const bookFilterSlice = createSlice({
  name: "bookFilter",
  initialState,
  reducers: {
    setBookAuthor: (state, action) => {
      state.author = action.payload.author;
    },
    setBookAño: (state, action) => {
      state.year = action.payload.year;
    },
    setBookGenero: (state, action) => {
      state.gender = action.payload.gender;
    },
  },
});

export const { setBookAuthor, setBookAño, setBookGenero } =
  bookFilterSlice.actions;
export default bookFilterSlice.reducer;
