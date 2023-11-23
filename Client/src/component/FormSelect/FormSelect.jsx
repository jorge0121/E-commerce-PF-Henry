import "./FormSelect.css";
import Select from "react-select";
import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Filter } from "../../handlers/FilterHandler/Filter";
import { FilterHandler } from "../../handlers/FilterHandler/FilterHandler";
import {
  setBookAuthor,
  setBookAño,
  setBookGenero,
} from "../../redux/reducers/BookFilter/BookFilterSlice";

function FormSelect() {
  const dispatch = useDispatch();
  const { author, year, gender, value, organization, page } = useSelector(
    (state) => state.bookFilter
  );
  const {
    handlerFilter,
    handlerAutorChange,
    handlerYearChange,
    handlerGenderChange,
    handlerSortChange,
    handlerSort,
  } = FilterHandler();
  const { dataA, dataY, dataG } = useSelector((state) => state.book);
  const { sortOption } = Filter();

  const [isAuthor, setIsAuthor] = useState(true);
  const [isYear, setIsYear] = useState(true);
  const [isGender, setIsGender] = useState(true);

  useEffect(() => {
    if (value && organization) {
      handlerSort();
    }
  }, [page]);

  useEffect(() => {
    if (author || year || gender) {
      handlerFilter();
    }
  }, [page]);

  const Checkbox = ({ children, ...props }) => (
    <label style={{ marginRight: "1em" }}>
      <input type="checkbox" {...props} />
      {children}
    </label>
  );
  return (
    <>
      <span>Autor</span>
      <Select
        // isDisabled={isAuthor}
        name="author"
        value={author}
        options={dataA}
        onChange={handlerAutorChange}
        className="select"
      />
      {/* <Checkbox
          checked={!isAuthor}
          onChange={() => setIsAuthor((state) => !state)}
        >
          Autor
        </Checkbox> */}
      {author ? (
        <Checkbox
          checked={author}
          onChange={() => dispatch(setBookAuthor({ author: "" }))}
        >
          {author}
        </Checkbox>
      ) : null}
      <span>Año</span>
      <Select
        // isDisabled={isYear}
        name="year"
        value={year}
        options={dataY}
        onChange={handlerYearChange}
        className="select"
      />
      {/* <Checkbox
          checked={!isYear}
          onChange={() => setIsYear((state) => !state)}
        >
          Año
        </Checkbox> */}
      {year ? (
        <Checkbox
          checked={year}
          onChange={() => dispatch(setBookAño({ year: "" }))}
        >
          {year}
        </Checkbox>
      ) : null}
      <span>Genero</span>
      <Select
        className="select"
        // isDisabled={isGender}
        name="gender"
        value={gender}
        options={dataG}
        onChange={handlerGenderChange}
      />
      {/* <Checkbox
          checked={!isGender}
          onChange={() => setIsGender((state) => !state)}
        >
          Genero
        </Checkbox> */}
      {gender ? (
        <Checkbox
          checked={gender}
          onChange={() => dispatch(setBookGenero({ gender: "" }))}
        >
          {gender}
        </Checkbox>
      ) : null}
      <button
        className="filterButton"
        onClick={handlerFilter}
        disabled={author || year || gender ? false : true}
      >
        Filtrar
      </button>{" "}
      <br />
      <span>Ordenar por...</span>
      <Select
        className="select"
        name="sort"
        options={sortOption}
        onChange={handlerSortChange}
      />
      <button
        className="filterButton"
        onClick={handlerSort}
        disabled={value && organization ? false : true}
      >
        Ordenar
      </button>
    </>
  );
}

export default FormSelect;
