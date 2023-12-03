import "./Cart.css";
import CartHandler from "../../handlers/CartHandler/CartHandler";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";

function Cart() {
  const { userBooks, totalBooks } = useSelector((state) => state.user);
  const { removeBookFromCart, addBookToCart, clearBookCart } = CartHandler();

  const prices = [];
  const totalPrices = [];
  const [resultado, setResultado] = useState(0);

  useEffect(() => {
    prices.map((e) => {
      const realPrice = e.price * e.quantity;
      totalPrices.push(realPrice);
    });
    setResultado(totalPrices.reduce((suma, numero) => suma + numero, 0));
    console.log("resultado", resultado);
  }, [totalBooks]);
  return (
    <>
      {userBooks.length === 0 ? (
        <h1> Todavia no tienes libros agregados al carrito </h1>
      ) : (
        <>
          <ul>
            {userBooks.map((book) => (
              <div key={book.id}>
                {prices.push({ price: book.price, quantity: book.quantity })}
                <Link to={`/detail/${book.id}`}>
                  <li>
                    Titulo: {book.title} Autor: {book.author} Precio: US$
                    {book.price}
                  </li>
                </Link>
                <button
                  onClick={() => {
                    removeBookFromCart(book.id);
                  }}
                >
                  -
                </button>
                <span> {book.quantity} </span>
                <button
                  onClick={() => {
                    addBookToCart(book.id);
                  }}
                >
                  +
                </button>
              </div>
            ))}
          </ul>
          <span>Cantidad total: {totalBooks}</span>
          <h3>Total US$: {resultado} </h3>
          <button onClick={clearBookCart}>Limpiar carrito</button>
        </>
      )}
    </>
  );
}

export default Cart;
