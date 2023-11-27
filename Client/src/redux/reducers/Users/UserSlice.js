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

    setUserBooks: (state, action) => {
      const { book } = action.payload;
      const existingBook = state.userBooks.find((b) => b.id === book.id);

      if (existingBook) {
        existingBook.quantity += 1;
      } else {
        state.userBooks.push({ ...book, quantity: 1 });
      }

      state.totalBooks += 1;
    },

    removeUserBooks: (state, action) => {
      const bookId = action.payload;

      state.totalBooks -= 1;
      state.userBooks = state.userBooks.filter((book) => book.id !== bookId);
    },

    updateUserBooks: (state, action) => {
      const { book } = action.payload;
      const existingBookIndex = state.userBooks.findIndex(
        (b) => b.id === book.id
      );

      if (existingBookIndex !== -1) {
        const existingBook = state.userBooks[existingBookIndex];

        existingBook.quantity -= 1;
        if (existingBook.quantity === 0) {
          state.userBooks.splice(existingBookIndex, 1);
        }

        state.totalBooks -= 1;
      }
    },

    //borrar carrito
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
  setUserBooks,
  unSetUserBooks,
  removeUserBooks,
  updateUserBooks,
  unSetUser,
} = userSlice.actions;

export default userSlice.reducer;
