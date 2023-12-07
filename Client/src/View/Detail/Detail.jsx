import "./Detail.css";
import axios from "axios";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import {
  setBookDetail,
  setCommentations,
} from "../../redux/reducers/BookDetail/BookDetailSlice";
import Reviews from "../../component/Reviews/Reviews";

function Detail() {
  const dispatch = useDispatch();

  const { detail, commentations, enviado } = useSelector(
    (state) => state.bookDetail
  );
  const { idBooks, email } = useSelector((state) => state.user);
  const { id } = useParams();

  useEffect(() => {
    const detailHandler = async (id) => {
      try {
        const { data } = await axios(
          `https://server-pf.onrender.com/book/${id}`
        );
        if (data) {
          dispatch(setBookDetail(data));
          dispatch(setCommentations(data.Commentations));
        }
      } catch (error) {
        console.log("error", error);
      }
    };
    detailHandler(id);
  }, [id, enviado]);

  return (
    <>
      <h1>Titulo: {detail.title}</h1>
      <h2>Autor: {detail.author}</h2>
      <img src={detail.image} alt="book's image" className="bookImage" />
      <h3> Descripcion: </h3> <p>{detail.description}</p>
      <br />
      <h3>Año de publicacion: {detail.year}</h3>
      <h3>Genero: {detail.gender}</h3>
      <h4>Numero de paginas: {detail.pages}</h4>
      <h2>Precio: US$ {detail.price} </h2>
      {commentations.length !== 0 &&
        commentations.map((comment) => (
          <div key={comment.id}>
            <h3> Usuario: {comment.User.name}</h3>
            <p>Reseña: {comment.commentation}</p>
          </div>
        ))}
      {email && idBooks.includes(Number(id)) ? <Reviews /> : null}
    </>
  );
}

export default Detail;
