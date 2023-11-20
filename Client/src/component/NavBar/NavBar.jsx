import React from 'react';
import styles from './NavBar.module.css'

const Navbar = () => {
  return (
    <nav className={styles.navbar}>
      <div className={styles.brand}>E-Commerce Books</div>
      <ul className={styles.navlinks}>
        <li><a href="/">Inicio</a></li>
        <li><a href="/productos">Productos</a></li>
        <li><a href="/carrito">Carrito</a></li>
      
      </ul>
    </nav>
  );
}

export default Navbar;