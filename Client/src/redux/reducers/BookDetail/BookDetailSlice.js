import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  detail: [],
};

export const bookDetailSlice = createSlice({
  name: "bookDetail",
  initialState,
  reducers: {
    setBookDetail: (state, action) => {
      state.detail = action.payload;
    },
  },
});

export const { setBookDetail } = bookDetailSlice.actions;
export default bookDetailSlice.reducer;
