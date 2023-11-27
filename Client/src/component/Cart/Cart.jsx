import "./Cart.css";
import CartHandler from "../../handlers/CartHandler/CartHandler";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

function Cart() {
  const { userBooks, totalBooks } = useSelector((state) => state.user);
  const { removeBookFromCart, addBookToCart, clearBookCart } = CartHandler();

  return (
    <>
      {userBooks.length === 0 ? (
        <h1> Todavia no tienes libros agregados al carrito </h1>
      ) : (
        <>
          <ul>
            {userBooks.map((book) => (
              <div key={book.id}>
                <Link to={`/detail/${book.id}`}>
                  <li>
                    Titulo: {book.title} Autor: {book.author} Precio:
                    {book.orice}
                    <h3>Cantidad: {book.quantity}</h3>
                  </li>
                </Link>
                <button
                  onClick={() => {
                    removeBookFromCart(book.id);
                  }}
                >
                  -
                </button>
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
          Total: {totalBooks}
          <button onClick={clearBookCart}>Limpiar carrito</button>
        </>
      )}
    </>
  );
}

export default Cart;
