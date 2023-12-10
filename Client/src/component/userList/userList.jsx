import React, { useEffect, useState } from 'react';
import axios from 'axios';



const UserList = () => {
  
  const [users, setUsers] = useState([]);
  const[page,setPage] = useState(1);
  const[totalData,setTotalData]=useState(1)
 
  
  const handlePaginaAnterior = () => {
    if (page > 1) {
      const prevPage = page - 1;
      setPage(prevPage);
    }
  };

  const handlePaginaSiguiente = () => {
    const nextPage = page + 1;
    setPage(nextPage);
  };
  
  const handleChangeEstado = async (user) =>{
    const updatedUsers = users.map((b) =>
    b.id === user.id ? { ...b, banned: !b.banned } : b
    );
    
  setUsers(updatedUsers);
  try {
    await axios.put(
      `https://server-pf.onrender.com/user/update?userId=${user.id}`,
      updatedUsers.find((b) => b.id === user.id)
    );
  } catch (error) {
    console.error('Error updating user:', error);
  }
  
  }
  const handleChangeRoll = async (user) =>{
    const updatedUsers = users.map((b) =>
    b.id === user.id ? { ...b, admin: !b.admin } : b
    );
    
  setUsers(updatedUsers);
  try {
    await axios.put(
      `https://server-pf.onrender.com/user/update?userId=${user.id}`,
      updatedUsers.find((b) => b.id === user.id)
    );
  } catch (error) {
    console.error('Error updating user:', error);
  }
  
  }

  

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`https://server-pf.onrender.com/user?page=${page}`);
        if(response){
          const totalPages = Math.ceil(response.data.count / 8);
          setTotalData(totalPages);
          setUsers(response.data.rows);
        }
       
    } catch (error) {
        console.error('Error fetching users:', error);
      }
    };

    fetchData();
  }, [page]);

  return (
      
    <div>
      <h2>Lista de Usuarios</h2>
      <div  className="table-container">
        <table className="table is-fullwidth is-bordered">
          <thead>
            <tr>
            <th>ID</th>
            <th>Nombre</th>
            <th>Correo</th>
            <th>Permisos</th>
            <th>Estado</th>
            <th></th>
            <th></th>
            </tr>
          </thead>
          <tbody>
          {users.map((user) => (
         <tr key={user.id}>
         <td>{user.id}</td>
         <td>{user.name}</td>
         <td>{user.email}</td>
         <td>{user.admin ? 'Admin':'Usuario'}</td>
         <td>{user.banned ? 'Activo':'Bloqueado'}</td>
         <td>
          <button className="button is-primary is-small" onClick={()=>handleChangeRoll(user)}>Cambiar Roll</button>
          </td>
          <td>

          <button className="button is-danger is-small" onClick={()=> handleChangeEstado(user)}>Cambiar Estado</button>
          </td>
        
    
       </tr>
        ))}
          </tbody>
        </table>
      </div>
    
      <div>
      <button
        onClick={handlePaginaAnterior}
        disabled={page === 1}
        className="orderButton"
      >
        Anterior
      </button>
      <span className="button is-static">
         {page} de {totalData }
      </span>
      <button
        onClick={handlePaginaSiguiente}
        disabled={page >= totalData  ? true : false}
        className="orderButton"
      >
        Siguiente
      </button>
    </div>

     
    </div>
    
  
  );
};

export default UserList;