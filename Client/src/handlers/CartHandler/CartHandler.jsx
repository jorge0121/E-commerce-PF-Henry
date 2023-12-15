import axios from "axios";
import { useSelector, useDispatch } from "react-redux";
import {
  setUserBooks,
  unSetUserBooks,
  removeUserBooks,
  updateUserBooks,
} from "../../redux/reducers/Users/UserSlice";
import {
  setSendUser,
  unSetSendUser,
} from "../../redux/reducers/SendUser/sendUserSlice";

function CartHandler() {
  const dispatch = useDispatch();
  const { userBooks, id, email, idBooks } = useSelector((state) => state.user);
  const { totalUSD } = useSelector((state) => state.sendUser);

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

  const buyBooks = async () => {};

  const checkBook = async (userData) => {
    if (userData) {
      const userName = userData.name;
      const userEmail = userData.email;
      const userAddress = userData.address;
      const userPhone = userData.phone;
      dispatch(setSendUser({ userName, userEmail, userAddress, userPhone }));
    }
    if (id && email) {
      try {
        await axios.put(
          `https://e-commerce-pf-henry.onrender.com/user/update?userId=${id}`,
          { idBooks }
        );
      } catch (error) {
        console.log("errorAxios", error.message);
      }
    }
    dispatch(unSetUserBooks());

    try {
      const Endpoint =
        "https://e-commerce-pf-henry.onrender.com/checkout/session"; //CAMBIAR POR LA RUTA AL BACK EN RENDER

      const data = userBooks.map((book) => ({
        productName: book.title,
        productDescription: book.description,
        unitAmount: totalUSD,
      }));

      // const data = {
      //   productName: userBooks.map((book) => book.title).join(", "),
      //   unitAmount: totalUSD,
      // };
      console.log("data", data);

      const response = await axios.post(Endpoint, data);

      console.log("response", response.data);
      if (response.data) {
        window.location.href = response.data;
        dispatch(unSetSendUser());
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
