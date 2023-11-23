import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { setBook, setTotalData } from "../../redux/reducers/Books/booksSlice";
import {
  setBookAuthor,
  setBookAño,
  setBookGenero,
  setBookValue,
  setBookOrganization,
  setBookPage,
} from "../../redux/reducers/BookFilter/BookFilterSlice";

export function FilterHandler() {
  const dispatch = useDispatch();
  const { author, year, gender, value, organization, page } = useSelector(
    (state) => state.bookFilter
  );
  const handlerAutorChange = (e) => {
    dispatch(setBookAuthor({ author: e.value }));
  };
  const handlerYearChange = (e) => {
    dispatch(setBookAño({ year: e.value }));
  };
  const handlerGenderChange = (e) => {
    dispatch(setBookGenero({ gender: e.value }));
  };

  const handlerSortChange = (e) => {
    if (e.value === "Titilo A-Z") {
      dispatch(setBookValue({ value: "title" }));
      dispatch(setBookOrganization({ organization: "ASC" }));
      dispatch(setBookPage({ page: 1 }));
    }
    if (e.value === "Titilo Z-A") {
      dispatch(setBookValue({ value: "title" }));
      dispatch(setBookOrganization({ organization: "DESC" }));
      dispatch(setBookPage({ page: 1 }));
    }
    if (e.value === "Precio menor") {
      dispatch(setBookValue({ value: "price" }));
      dispatch(setBookOrganization({ organization: "ASC" }));
      dispatch(setBookPage({ page: 1 }));
    }
    if (e.value === "Precio mayor") {
      dispatch(setBookValue({ value: "price" }));
      dispatch(setBookOrganization({ organization: "DESC" }));
      dispatch(setBookPage({ page: 1 }));
    }
  };

  const handlerSort = async (event) => {
    if (event) {
      event.preventDefault();
    }
    try {
      const { data } = await axios(
        `http://localhost:3001/book/booksort?value=${value}&organization=${organization}&page=${page}`
      );
      if (data) {
        const totalPages = Math.ceil(data.count / 4);
        dispatch(setBook(data.rows));
        dispatch(setTotalData(totalPages));
      }
    } catch (error) {
      console.log("error", error);
    }
  };

  const handlerFilter = async (event) => {
    // event.preventDefault();
    try {
      const { data } = await axios(
        `http://localhost:3001/book/filter?author=${author}&year=${year}&gender=${gender}&page=${page}`
      );
      if (data) {
        const totalPages = Math.ceil(data.count / 4);
        dispatch(setTotalData(totalPages));
        dispatch(setBook(data.filteredBooks));
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
    handlerSortChange,
    handlerSort,
  };
}
