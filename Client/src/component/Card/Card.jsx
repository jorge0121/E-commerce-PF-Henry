import "./Card.css";
import CartHandler from "../../handlers/CartHandler/CartHandler";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

function CardBook({ book }) {
  const { userBooks } = useSelector(state => state.user);

  const { id, title, image, price } = book;
  const { putOrRemoveBookToCart } = CartHandler();

  return (
    <div className="card">
      <div className="card-image">
        <img src={image} alt="book's image" />
      </div>
      <div className="card-content">
        <Link to={`/detail/${id}`}>
          <h1>{title}</h1>
        </Link>
      </div>
      <div>
        <h2>Precio: US$ {price} </h2>
      </div>
      <div className="card-tarjeta">
        <button
          className="button is-primary"
          onClick={() => {
            putOrRemoveBookToCart(id);
          }}
        >
          {userBooks.find(book => book.id === id)
            ? "Remover del "
            : "Agregar al "}
          carrito
        </button>
      </div>
    </div>
  );
}

export default CardBook;
