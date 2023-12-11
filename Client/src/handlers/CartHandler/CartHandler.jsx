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
    //detalles a ver abajo de todo

    try {
      const Endpoint = "http://localhost:3001/checkout/session"; //CAMBIAR POR LA RUTA AL BACK EN RENDER

      const data = userBooks.map(book => ({
        productName: book.title,
        productDescription: book.description,
        unitAmount: book.price,
      }));

      const response = await axios.post(Endpoint, data);

      console.log(response);
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
