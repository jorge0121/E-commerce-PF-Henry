import "./Cart.css";
import CartHandler from "../../handlers/CartHandler/CartHandler";
import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { setIdBooks } from "../../redux/reducers/Users/UserSlice";
import { Link } from "react-router-dom";

function Cart() {
  const dispatch = useDispatch();
  const { userBooks, totalBooks } = useSelector((state) => state.user);
  const {
    removeBookFromCart,
    addBookToCart,
    clearBookCart,
    buyBooks,
    checkBook,
  } = CartHandler();

  // const prices = [];
  // const totalPrices = [];
  const [resultado, setResultado] = useState(0);

  useEffect(() => {
    const booksBack = userBooks.map((item) => item.price * item.quantity);
    setResultado(booksBack.reduce((suma, numero) => suma + numero, 0));
  }, [totalBooks]);

  useEffect(() => {
    const booksId = userBooks.map((book) => book.id);
    if (booksId) {
      dispatch(setIdBooks({ idBooks: booksId }));
    }
  }, []);

  // useEffect(() => {
  //   prices.map((e) => {
  //     const realPrice = e.price * e.quantity;
  //     totalPrices.push(realPrice);
  //   });
  // }, [totalBooks]);

  return (
    <>
      {userBooks.length === 0 ? (
        <h1> Todavia no tienes libros agregados al carrito </h1>
      ) : (
        <>
          <table className="table table is-striped is-narrow is-hoverable is-fullwidth">
            <thead>
              <tr>
                <th>Item</th>
                <th>Titulo</th>
                <th>Autor</th>
                <th>Precio</th>
                <th>Cantidad</th>
              </tr>
            </thead>
            <tbody>
              {userBooks.map((book) => (
                <><br />
                  {/* {prices.push({ price: book.price, quantity: book.quantity })} */}
                  <tr key={book.id}>
                    <td></td>
                    <th>
                      <Link to={`/detail/${book.id}`}>{book.title}</Link>
                    </th>
                    <td>{book.author}</td>
                    <td>US$ {book.price}</td>
                    <td>
                      <button
                        className="button is-danger"
                        onClick={() => {
                          removeBookFromCart(book.id);
                        }}
                      >
                        -
                      </button>
                      <span className="quantity">
                        <strong>{book.quantity} </strong>
                      </span>
                      <button
                        className="button is-primary"
                        onClick={() => {
                          addBookToCart(book.id);
                        }}
                      >
                        +
                      </button>
                    </td>
                  </tr>
                </>
              ))}
            </tbody>
          </table>
          <div className="tags has-addons">
            <span className="tag is-primary is-large">
              Cantidad total: {totalBooks}
            </span>
            <span className="tag is-success is-large">
              Total US$: {resultado}
            </span>
          </div>
          <br />
          <button onClick={clearBookCart} className="button is-danger clean ">
            Limpiar carrito
          </button>
          <button onClick={checkBook} className="button is-primary buy">
            Comprar ahora
          </button>
        </>
      )}
    </>
  );
}

export default Cart;
