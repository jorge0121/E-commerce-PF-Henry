import axios from "axios";
import Cards from "../component/Cards/Cards";
import FormSelect from "../component/FormSelect/FormSelect";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { setBook, setBookCopia } from "../redux/reducers/Books/booksSlice";
// import { useDispatch, useSelector } from "react-redux";

function Home() {
  const dispatch = useDispatch();
  useEffect(() => {
    const homeFuntion = async () => {
      try {
        const { data } = await axios(`http://localhost:3001/book/`);
        if (data) {
          dispatch(setBook(data));
          dispatch(setBookCopia(data));
        }
      } catch (error) {
        console.log("error", error);
      }
    };
    homeFuntion();
  }, []);

  return (
    <>
      <br />
      <FormSelect />
      <Cards />
    </>
  );
}

export default Home;
