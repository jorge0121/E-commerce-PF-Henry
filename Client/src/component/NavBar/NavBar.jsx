import axios from "axios";
import styles from "./NavBar.module.css";
import RegisterLogin from "../RegisterLogin/RegisterLogin";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useLocation } from "react-router-dom";
import { setBook, setTotalData } from "../../redux/reducers/Books/booksSlice";
import logo from "./../../img/logo2.png";

const Navbar = () => {
  const { id, admin } = useSelector((state) => state.user);

  const location = useLocation();
  const dispatch = useDispatch();
  const [searchTerm, setSearchTerm] = useState("");

  const handleSearch = async () => {
    try {
      const { data } = await axios(
        `https://e-commerce-pf-henry.onrender.com/book?name=${searchTerm}`
      );
      if (data) {
        dispatch(setBook(data));
        dispatch(setTotalData(1));
      }
    } catch (error) {
      console.log("error", error);
    }
  };

  return (
    <nav className={styles.navbar} id="arriba">
      {location.pathname === "/admin" || location.pathname === "/bulke" ? (
        <>
          <ul className={styles.navlinks}>
            <li>
              <Link to="/">Inicio</Link>
            </li>
            <li>
              <Link to="/bulke">Crear Libro</Link>
            </li>
            {location.pathname === "/bulke" ? (
              <li>
                <Link to="/admin">Atras</Link>
              </li>
            ) : null}
          </ul>
        </>
      ) : (
        <>
          <div className={styles.brand}>
            <img className={styles.logo} src={logo} alt="" />

            <span className="spann"> E-Commerce Books</span>
          </div>
          <div className={styles.searchbar}>
            <input
              className={styles.searchinput}
              type="text"
              placeholder="Buscar libros por titulo"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <button className={styles.searchbutton} onClick={handleSearch}>
              Buscar
            </button>
          </div>
          <ul className={styles.navlinks}>
            <li>
              <Link to="/">Inicio</Link>
            </li>
            {id && admin === true ? (
              <li>
                <Link to="/admin">Admin</Link>
              </li>
            ) : null}
            <li>
              <Link to="/carrito">Carrrito</Link>
            </li>
            <li className={styles.login}>
              <RegisterLogin />
            </li>
          </ul>
        </>
      )}
    </nav>
  );
};

export default Navbar;
