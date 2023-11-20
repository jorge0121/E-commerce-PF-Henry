import "./Card.css";
import { Link } from "react-router-dom";

function Card({ book }) {
  const { id, title, image, price } = book;

  return (
    <div className="card">
      <h3>{id}</h3>
      <Link to={`/detail/${id}`}>
        <h1> Titulo: {title}</h1>
      </Link>
      <img src={image} alt="book's image" />
      <h2>Precio: {price} $</h2>
    </div>
  );
}

export default Card;
