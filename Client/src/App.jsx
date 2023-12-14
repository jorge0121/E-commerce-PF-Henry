import "./App.css";
import "bulma/css/bulma.min.css";
import Home from "./View/Home";
import Cart from "./component/Cart/Cart";
import Detail from "./View/Detail/Detail";
import Footer from "./component/Footer/Footer";
import NavBar from "./component/NavBar/NavBar";
import Banned from "./component/Banned/Banned";
import AdminView from "./View/adminView/adminView";
import FormCreateBook from "./component/FormCreateBook/FormCreateBook";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { Route, Routes, useLocation, useNavigate } from "react-router-dom";

function App() {
  const { admin, banned } = useSelector((state) => state.user);

  let location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    !admin && navigate("/");
  }, [admin]);

  useEffect(() => {
    banned && navigate("/banned");
  }, [banned]);

  return (
    <>
      {location.pathname !== "/admin" && <NavBar />}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/detail/:id" element={<Detail />} />
        <Route path="/carrito" element={<Cart />} />
        <Route path="/admin" element={<AdminView />} />
        <Route exact path="/bulke" element={<FormCreateBook />} />
        <Route exact path="/banned" element={<Banned />} />
      </Routes>
      {location.pathname !== "/admin" && <Footer />}
    </>
  );
}

export default App;
