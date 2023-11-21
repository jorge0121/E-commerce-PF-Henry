import Select from "react-select";
import { useState } from "react";
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
  const { author, year, gender } = useSelector((state) => state.bookFilter);

  const {
    handlerFilter,
    handlerAutorChange,
    handlerYearChange,
    handlerGenderChange,
  } = FilterHandler();
  const { dataA, dataY, dataG } = Filter();

  const [isAuthor, setIsAuthor] = useState(true);
  const [isYear, setIsYear] = useState(true);
  const [isGender, setIsGender] = useState(true);

  const Checkbox = ({ children, ...props }) => (
    <label style={{ marginRight: "1em" }}>
      <input type="checkbox" {...props} />
      {children}
    </label>
  );
  return (
    <>
      <form action="">
        <Select
          isDisabled={isAuthor}
          name="author"
          value={author}
          options={dataA}
          onChange={handlerAutorChange}
        />

        <Checkbox
          checked={!isAuthor}
          onChange={() => setIsAuthor((state) => !state)}
        >
          Autor
        </Checkbox>
        {author ? (
          <Checkbox
            checked={author}
            onChange={() => dispatch(setBookAuthor({ author: "" }))}
          >
            {author}
          </Checkbox>
        ) : null}
        <Select
          isDisabled={isYear}
          name="year"
          value={year}
          options={dataY}
          onChange={(event) => {
            handlerYearChange(event);
          }}
        />
        <Checkbox
          checked={!isYear}
          onChange={() => setIsYear((state) => !state)}
        >
          Año
        </Checkbox>
        {year ? (
          <Checkbox
            checked={year}
            onChange={() => dispatch(setBookAño({ year: "" }))}
          >
            {year}
          </Checkbox>
        ) : null}
        <Select
          className="basic-single"
          classNamePrefix="select"
          isDisabled={isGender}
          name="gender"
          value={gender}
          options={dataG}
          onChange={(event) => {
            handlerGenderChange(event);
          }}
        />

        <Checkbox
          checked={!isGender}
          onChange={() => setIsGender((state) => !state)}
        >
          Genero
        </Checkbox>
        {gender ? (
          <Checkbox
            checked={gender}
            onChange={() => dispatch(setBookGenero({ gender: "" }))}
          >
            {gender}
          </Checkbox>
        ) : null}

        <button
          onClick={handlerFilter}
          disabled={author || year || gender ? false : true}
        >
          filtrar
        </button>
      </form>
    </>
  );
}

export default FormSelect;
