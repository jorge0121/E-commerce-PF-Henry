import RegisterLogin from "../RegisterLogin/RegisterLogin";
import styles from "./NavBar.module.css";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { setBook, setTotalData } from "../../redux/reducers/Books/booksSlice";
import axios from "axios";
import { Link, useLocation } from "react-router-dom";
import logo from "./../../img/logo2.png";

const Navbar = () => {
  const location = useLocation();
  const dispatch = useDispatch();
  const [searchTerm, setSearchTerm] = useState("");

  const handleSearch = async () => {
    try {
      const { data } = await axios(
        `https://server-pf.onrender.com/book?name=${searchTerm}`
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
    <nav className={styles.navbar}>
      {location.pathname === "/admin" ? (
        <>
          {/* <div className={styles.brand}>E-Commerce Books</div> */}
          <ul className={styles.navlinks}>
            <li>
              <Link to="/">Inicio</Link>
            </li>
            <li>
              <Link to="/bulke">Crear Libro</Link>
            </li>
          </ul>
        </>
      ) : (
        <>
        
            
            <div className={styles.brand}>
            <img className={styles.logo} src={logo} alt=""  />
              
             <span className="spann"> E-Commerce Books</span></div>
          <div className={styles.searchbar}>
            <input
              className={styles.searchinput}
              type="text"
              placeholder="Buscar libros por titulo"
              value={searchTerm}
              onChange={e => setSearchTerm(e.target.value)}
            />
            <button className={styles.searchbutton} onClick={handleSearch}>
              Buscar
            </button>
          </div>
          <ul className={styles.navlinks}>
            <li>
              <Link to="/">Inicio</Link>
            </li>

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
