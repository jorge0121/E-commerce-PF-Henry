import "./Card.css";
import CartHandler from "../../handlers/CartHandler/CartHandler";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

function Card({ book }) {
  const { userBooks } = useSelector((state) => state.user);

  const { id, title, image, price } = book;
  const { putOrRemoveBookToCart } = CartHandler();

  return (
    <div className="card">
      <h3>{id}</h3>
      <Link to={`/detail/${id}`}>
        <h1> Titulo: {title}</h1>
      </Link>
      <img src={image} alt="book's image" />
      <h2>Precio: US$ {price} </h2>
      <button
        onClick={() => {
          putOrRemoveBookToCart(id);
        }}
      >
        {userBooks.find((book) => book.id === id)
          ? "Remover del "
          : "Agregar al "}
        carrito
      </button>
    </div>
  );
}

export default Card;
