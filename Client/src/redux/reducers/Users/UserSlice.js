import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  id: "",
  name: "",
  email: "",
  userBooks: [],
  totalBooks: 0,
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.id = action.payload.id;
      state.name = action.payload.name;
      state.email = action.payload.email;
    },
    // setNombre: (state, action) => {
    // },
    // setEmail: (state, action) => {
    // },
    setUserBooks: (state, action) => {
      state.userBooks = [...state.userBooks, action.payload.userBooks];
      state.totalBooks += 1;
    },
    unSetUserBooks: (state) => {
      state.userBooks = [];
      state.totalBooks = 0;
    },

    // este se utliza en el logout
    unSetUser: (state) => {
      state.id = "";
      state.name = "";
      state.email = "";
      state.userBooks = [];
      state.totalBooks = 0;
    },
  },
});

export const {
  setUser,
  //   setNombre,
  //   setEmail,
  setUserBooks,
  unSetUserBooks,
  unSetUser,
} = userSlice.actions;

export default userSlice.reducer;
