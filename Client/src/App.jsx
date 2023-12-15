import "./App.css";
import "bulma/css/bulma.min.css";
import Home from "./View/Home";
import Success from "./component/Success/Success";
import Cancel from "./component/Cancel/Cancel";
import Cart from "./component/Cart/Cart";
import Detail from "./View/Detail/Detail";
import Footer from "./component/Footer/Footer";
import NavBar from "./component/NavBar/NavBar";
import Banned from "./component/Banned/Banned";
import AdminView from "./View/adminView/adminView";
import FormCreateBook from "./component/FormCreateBook/FormCreateBook";
import { useEffect,useState } from "react";
import { useSelector } from "react-redux";
import { Route, Routes, useLocation, useNavigate } from "react-router-dom";

function App() {
  const { admin, banned } = useSelector((state) => state.user);
  const [rerenderKey, setRerenderKey] = useState(0);
  let location = useLocation();
  const navigate = useNavigate();
  const rerenderHome = () => {
    setRerenderKey((prevKey) => prevKey + 1);
  };

  useEffect(() => {
    !admin && navigate("/");
  }, [admin]);

  useEffect(() => {
    banned && navigate("/banned");
  }, [banned]);

  return (
    <>
      {/*location.pathname !== "/admin" && <NavBar rerenderHome={rerenderHome} />*/}
      {/* {location.pathname !== "/admin"  && <NavBar />} */}
      {location.pathname !== "/admin" && location.pathname !== "/banned" ? (
        <NavBar rerenderHome={rerenderHome}/>
      ) : null}

      <Routes>
        <Route path="/" element={<Home rerenderKey={rerenderKey} />} />
        <Route path="/detail/:id" element={<Detail />} />
        <Route path="/carrito" element={<Cart />} />
        <Route path="/admin" element={<AdminView />} />
        <Route path="/checkout/success" element={<Success />} />
        <Route path="/checkout/cancel" element={<Cancel />} />
        <Route exact path="/bulke" element={<FormCreateBook />} />
        <Route exact path="/banned" element={<Banned />} />
      </Routes>
      {location.pathname !== "/admin" && <Footer />}
    </>
  );
}

export default App;
