import "./App.css";
import Home from "./View/Home";
import Cart from "./component/Cart/Cart";
import Detail from "./View/Detail/Detail";
import NavBar from "./component/NavBar/NavBar";
import RegisterLogin from "./component/RegisterLogin/RegisterLogin";
import { Route, Routes } from "react-router-dom";
import CreateBookView from "./View/createBookView";

function App() {
  return (
    <>
      <NavBar />
      <RegisterLogin />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/detail/:id" element={<Detail />} />
        <Route path="/carrito" element={<Cart />} />
        <Route path="/bulke" element={<CreateBookView/>} />
      </Routes>
    </>
  );
}

export default App;
