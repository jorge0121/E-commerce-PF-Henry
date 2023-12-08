import "./FormSelect.css";
import { useEffect } from "react";
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

  const { dataA, dataY, dataG } = useSelector((state) => state.book);
  const { author, year, gender, value, organization, page } = useSelector(
    (state) => state.bookFilter
  );

  const { sortOption } = Filter();
  const {
    handlerFilter,
    handlerAutorChange,
    handlerYearChange,
    handlerGenderChange,
    handlerSortChange,
    handlerSort,
  } = FilterHandler();

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

  return (
    <ul className="Contenido-selects">
      <li className="li">
        <div className="field">
          <label className="label">Autor</label>
          <div className="control">
            <div className="select is-fullwidth">
              <select
                className="select"
                name="author"
                value={author}
                onChange={handlerAutorChange}
              >
                <optgroup label="Filtrar por autor">
                  {dataA.map((option) => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </optgroup>
              </select>
            </div>
          </div>
        </div>
        {author && (
          <div className="control">
            <label className="checkbox">
              <input
                type="checkbox"
                checked={author}
                onChange={() => dispatch(setBookAuthor({ author: "" }))}
              />
              {author}
            </label>
          </div>
        )}
      </li>

      <li className="li">
        <div className="field">
          <label className="label">Año</label>
          <div className="control">
            <div className="select is-fullwidth">
              <select name="year" value={year} onChange={handlerYearChange}>
                {dataY.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>
        {year && (
          <div className="control">
            <label className="checkbox">
              <input
                type="checkbox"
                checked={year}
                onChange={() => dispatch(setBookAño({ year: "" }))}
              />
              {year}
            </label>
          </div>
        )}
      </li>

      <li className="li">
        <div className="field">
          <label className="label">Género</label>
          <div className="control">
            <div className="select is-fullwidth">
              <select
                name="gender"
                value={gender}
                onChange={handlerGenderChange}
              >
                {dataG.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>
        {gender && (
          <div className="control">
            <label className="checkbox">
              <input
                type="checkbox"
                checked={gender}
                onChange={() => dispatch(setBookGenero({ gender: "" }))}
              />
              {gender}
            </label>
          </div>
        )}
      </li>
      <button
        className="button is-primary is-hovered"
        onClick={handlerFilter}
        disabled={author || year || gender ? false : true}
      >
        Filtrar
      </button>

      <li className="li">
        <div className="field">
          <label className="label">Ordenar por...</label>
          <div className="control">
            <div className="select is-fullwidth">
              <select name="sort" value={value} onChange={handlerSortChange}>
                {sortOption.map((item) => (
                  <option key={item.value} value={item.value}>
                    {item.value}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>
      </li>
      <button
        disabled={!value ? true : false}
        className="button is-primary is-hovered"
        onClick={handlerSort}
      >
        Ordenar
      </button>
    </ul>
  );
}

export default FormSelect;
