import { useSelector, useDispatch } from "react-redux";
import {
  setUserBooks,
  setIdBooks,
  unSetUserBooks,
  removeUserBooks,
  updateUserBooks,
} from "../../redux/reducers/Users/UserSlice";
import axios from "axios";

function CartHandler() {
  const dispatch = useDispatch();
  const { userBooks, id, email } = useSelector((state) => state.user);
  const books = useSelector((state) => state.book.books);

  const putOrRemoveBookToCart = (id) => {
    const book = books.find((book) => book.id === id);
    if (userBooks.find((b) => b.id === id)) {
      dispatch(removeUserBooks(id));
    } else {
      dispatch(setUserBooks({ book }));
    }
  };

  const addBookToCart = (id) => {
    const book = userBooks.find((book) => book.id === id);
    if (book) {
      dispatch(setUserBooks({ book }));
    }
  };

  const removeBookFromCart = (id) => {
    const book = userBooks.find((book) => book.id === id);
    if (book) {
      dispatch(updateUserBooks({ book }));
    }
  };

  const clearBookCart = () => {
    dispatch(unSetUserBooks());
  };

  const buyBooks = async () => {
    const idBooks = userBooks.map((book) => book.id);
    if (idBooks) {
      dispatch(setIdBooks({ idBooks }));
      if (id && email) {
        try {
          console.log("idBooks", idBooks);
          await axios.put(
            `https://server-pf.onrender.com/user/update?userId=${id}`,
            { idBooks }
          );
        } catch (error) {
          console.log("errorAxios", error);
        }
      }
      dispatch(unSetUserBooks());
    }
  };

  return {
    putOrRemoveBookToCart,
    clearBookCart,
    removeBookFromCart,
    addBookToCart,
    buyBooks,
  };
}

export default CartHandler;
