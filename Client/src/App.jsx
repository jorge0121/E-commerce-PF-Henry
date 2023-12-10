import "./App.css";
import "bulma/css/bulma.min.css";
import Home from "./View/Home";
import Cart from "./component/Cart/Cart";
import Detail from "./View/Detail/Detail";
import NavBar from "./component/NavBar/NavBar";
import FormCreateBook from "./component/FormCreateBook/FormCreateBook";
import { Route, Routes } from "react-router-dom";
import AdminView from "./View/adminView/adminView";

function App() {
  return (
    <>
      

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/detail/:id" element={<Detail />} />
        <Route path="/carrito" element={<Cart/>} />
        <Route path="/admin" element={<AdminView/>} />
        <Route exact path='/bulke' element={<FormCreateBook/>} />
      </Routes>
    </>
  );
}

export default App;
