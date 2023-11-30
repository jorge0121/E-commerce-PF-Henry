import "./Home.css";
import axios from "axios";
import Cards from "../component/Cards/Cards";
import Paginado from "../component/Paginado/Paginado";
import FormSelect from "../component/FormSelect/FormSelect";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  setBook,
  setDataA,
  setDataY,
  setDataG,
  setTotalData,
} from "../redux/reducers/Books/booksSlice";

function Home() {
  const { author, year, gender, value, organization, page } = useSelector(
    (state) => state.bookFilter
  );
  const { totalData, books } = useSelector((state) => state.book);

  const dispatch = useDispatch();

  useEffect(() => {
    if (!author && !year && !gender && !value && !organization) {
      const homeFuntion = async () => {
        try {
          const { data } = await axios(
            `https://server-pf.onrender.com/book?page=${page}`
          );
          if (data) {
            const totalPages = Math.ceil(data.count / 4);
            dispatch(setTotalData(totalPages));
            dispatch(setBook(data.rows));
          }
        } catch (error) {
          console.log("error", error);
        }
      };
      homeFuntion();
    }
  }, [page]);

  useEffect(() => {
    const cositas = async () => {
      const { data } = await axios(
        "https://server-pf.onrender.com/book/author-year-gender"
      );
      if (data) {
        dispatch(setDataA(data.dataA));
        dispatch(setDataY(data.dataY));
        dispatch(setDataG(data.dataG));
      }
    };
    cositas();
  }, []);

  return (
    <>
      <br />
      <FormSelect />
      <Paginado />
      {books.length === 0 && totalData === 1 ? (
        <>
          <h3>Lo sentimos, al momento no contamos con ese libro</h3>
          <h1>🥲</h1>
        </>
      ) : books.length === 0 && (author || year || gender) ? (
        <>
          <h3>
            Lo sentimos, al momento no contamos con libros que tengan esas
            características
          </h3>
          <h1>🥲</h1>
        </>
      ) : (
        <div className="containerB">
          <Cards />
        </div>
      )}
    </>
  );
}

export default Home;
