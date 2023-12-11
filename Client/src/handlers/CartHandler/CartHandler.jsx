import { useSelector, useDispatch } from "react-redux";
import {
  setUserBooks,
  unSetUserBooks,
  removeUserBooks,
  updateUserBooks,
} from "../../redux/reducers/Users/UserSlice";
import axios from "axios";

function CartHandler() {
  const dispatch = useDispatch();
  const { userBooks, id, email, idBooks } = useSelector(state => state.user);
  const books = useSelector(state => state.book.books);

  const putOrRemoveBookToCart = id => {
    const book = books.find(book => book.id === id);
    if (userBooks.find(b => b.id === id)) {
      dispatch(removeUserBooks(id));
    } else {
      dispatch(setUserBooks({ book }));
    }
  };

  const addBookToCart = id => {
    const book = userBooks.find(book => book.id === id);
    if (book) {
      dispatch(setUserBooks({ book }));
    }
  };

  const removeBookFromCart = id => {
    const book = userBooks.find(book => book.id === id);
    if (book) {
      dispatch(updateUserBooks({ book }));
    }
  };

  const clearBookCart = () => {
    dispatch(unSetUserBooks());
  };

  const buyBooks = async () => {
    if (id && email) {
      try {
        await axios.put(
          `https://server-pf.onrender.com/user/update?userId=${id}`,
          { idBooks }
        );
      } catch (error) {
        console.log("errorAxios", error.message);
      }
    }
    dispatch(unSetUserBooks());
  };
  
  const checkBook = async () => {
    try {
      const Endpoint = "https://server-pf.onrender.com/checkout/session"; //CAMBIAR POR LA RUTA AL BACK EN RENDER

      const data = userBooks.map(book => ({
        productName: book.title,
        productDescription: book.description,
        unitAmount: book.price,
      }));

      const response = await axios.post(Endpoint, data[0]);

      console.log("response", response.data);
      if (response.data) {
        window.location.href = response.data;
      }
    } catch (error) {
      console.log(error);
    }
  };

  return {
    putOrRemoveBookToCart,
    clearBookCart,
    removeBookFromCart,
    addBookToCart,
    buyBooks,
    checkBook,
  };
}

export default CartHandler;

//buyBooks

//DA ERROR AL RECIBIR EL DATA PERO DESDE INSOMNIA ANDA

// JSON DE INSOMNIA EJEMPLO
//http://localhost:3001/checkout/session
//{
// "productName": "garcia marquez" ,
// "productDescription":"realismo Magico",
// "unitAmount":2000
//}
