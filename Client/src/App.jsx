import "./App.css";
import Home from "./View/Home";
import Cart from "./component/Cart/Cart";
import Detail from "./View/Detail/Detail";
import NavBar from "./component/NavBar/NavBar";
import RegisterLogin from "./component/RegisterLogin/RegisterLogin";
import { Route, Routes } from "react-router-dom";

function App() {
  return (
    <>
      <NavBar />
      <RegisterLogin />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/detail/:id" element={<Detail />} />
        <Route path="/carrito" element={<Cart />} />
      </Routes>
    </>
  );
}

export default App;
