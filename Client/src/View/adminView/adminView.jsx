import FormCreateBook from '../../component/FormCreateBook/FormCreateBook'
import UserList from '../../component/userList/userList';
import React, { useState } from 'react';
import BooksList from '../../component/BooksList/BooksList';
import { Link } from 'react-router-dom';
import NavBar from '../../component/NavBar/NavBar';
import style from './adminView.module.css'




const adminView= () =>{
    const [showUserList, setShowUserList] = useState(true);
    const [showBooksList, setShowBooksList] = useState(false);

    const handleVerUsuariosClick = () => {
      // Si showUserList es true, lo establece en false para desmontar UserList
      setShowUserList(prevState => !prevState);
    };
    const handleVerLibrosClick = () => {
        // Si showUserList es true, lo establece en false para desmontar BooksList
        setShowBooksList(prevState => !prevState);
      };
  
    return (
        <>
        <NavBar/>

        <div>
          
        <div>

  
        {/* Botón para ver/ocultar usuarios */}
        <button onClick={handleVerUsuariosClick}  className={style.button}>
          {showUserList ? 'Ocultar Usuarios' : 'Ver Usuarios'}
        </button>
  
        {/* Condición para renderizar UserList */}
        {showUserList && <UserList />}
        </div>
        <br />
        <div>
        {/* Botón para ver/ocultar Libros */}
        <button onClick={handleVerLibrosClick}  className={style.button}>
          {showBooksList ? 'Ocultar Libros' : 'Ver Libros'}
        </button>
  
        {/* Condición para renderizar UserList */}
        {showBooksList && <BooksList />}
      </div>
      


</div>
        </>
      
    );
}
export default adminView;