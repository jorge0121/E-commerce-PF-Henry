import "./Cart.css";
import CartHandler from "../../handlers/CartHandler/CartHandler";
import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { setIdBooks } from "../../redux/reducers/Users/UserSlice";
import { Link } from "react-router-dom";

function Cart() {
  const dispatch = useDispatch();
  const { userBooks, totalBooks } = useSelector(state => state.user);
  const { removeBookFromCart, addBookToCart, clearBookCart, buyBooks } =
    CartHandler();

  const prices = [];
  const totalPrices = [];
  const [resultado, setResultado] = useState(0);

  useEffect(() => {
    const booksId = userBooks.map(book => book.id);
    if (booksId) {
      dispatch(setIdBooks({ idBooks: booksId }));
    }
  }, []);

  useEffect(() => {
    prices.map(e => {
      const realPrice = e.price * e.quantity;
      totalPrices.push(realPrice);
    });
    setResultado(totalPrices.reduce((suma, numero) => suma + numero, 0));
  }, [totalBooks]);

  return (
    <>
      {/* {userBooks.length === 0 ? (
        <h1> Todavia no tienes libros agregados al carrito </h1>
      ) : (
        <> 
            <ul className="table is-striped">
              
            {userBooks.map((book) => (
              <div className="" key={book.id}>

                {prices.push({ price: book.price, quantity: book.quantity })}
                <Link to={`/detail/${book.id}`}>
                    <img className="image" src={book.image } alt="" />
                  <li className="tbody">
                    {book.title} Autor: {book.author} Precio: US$
                    {book.price}
                  </li>
                </Link>
                <button 
                  onClick={() => {
                    removeBookFromCart(book.id);
                  }}
                >
                  -
                </button >
                <span> {book.quantity} </span>
                <button
                  onClick={() => {
                    addBookToCart(book.id);
                  }}
                >
                  +
                </button>
              </div>
            ))}
          </ul>
          <span>Cantidad total: {totalBooks}</span>
            <h3>Total US$: {resultado} </h3>
            <div className="boton">

          <button className="button is-primary" onClick={clearBookCart}>Limpiar carrito</button>
          <button  className="button is-primary" onClick={buyBooks}>Comprar ahora</button>
            </div>
        </>
      )} 
      

      <div>


    </div> */}
      <>
        <table className="table is-fullwidth">
          <thead>
            <tr>
              <th>Imagen</th>
              <th>Título</th>
              <th>Autor</th>
              <th>Precio</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {userBooks.map(book => (
              <tr key={book.id}>
                <td>
                  <Link to={`/detail/${book.id}`}>
                    <img className="image" src={book.image} alt="" />
                  </Link>
                </td>
                <td>{book.title}</td>
                <td>{book.author}</td>
                <td>US$ {book.price}</td>
                <td>
                  <button className="button"onClick={() => removeBookFromCart(book.id)}>-</button>
                  <span className="quantity">{book.quantity}</span>
                  <button className="button "onClick={() => addBookToCart(book.id)}>+</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        
            <div className="Contenedor-resultados">
          
            
        <span className="texto-resultados">Cantidad total: {totalBooks}</span>
            <span className="texto-resultados">Total US$: {resultado}</span> 
          
          <div className="contenedor-Botones">
            <div className="Btn1">
              
           <button className="button is-primary" onClick={clearBookCart}>Limpiar carrito</button>
            </div>
            <div className="Btn1">

          <button  className="button is-primary" onClick={buyBooks}>Comprar ahora</button>
            </div>
          </div>
            </div>



      </>
    </>
  );
}

export default Cart;
