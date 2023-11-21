import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { setBook } from "../../redux/reducers/Books/booksSlice";
import {
  setBookAuthor,
  setBookAño,
  setBookGenero,
} from "../../redux/reducers/BookFilter/BookFilterSlice";

export function FilterHandler() {
  const dispatch = useDispatch();
  const { author, year, gender } = useSelector((state) => state.bookFilter);

  const handlerAutorChange = (e) => {
    dispatch(setBookAuthor({ author: e.value }));
  };
  const handlerYearChange = (e) => {
    dispatch(setBookAño({ year: e.value }));
  };
  const handlerGenderChange = (e) => {
    dispatch(setBookGenero({ gender: e.value }));
  };

  const handlerFilter = async (event) => {
    event.preventDefault();
    try {
      const { data } = await axios(
        `http://localhost:3001/book/filter?author=${author}&year=${year}&gender=${gender}`
      );
      if (data) {
        dispatch(setBook(data));
      }
    } catch (error) {
      console.log("error", error);
    }
  };
  return {
    handlerFilter,
    handlerAutorChange,
    handlerYearChange,
    handlerGenderChange,
  };
}
