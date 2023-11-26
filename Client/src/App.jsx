import "./App.css";
import Home from "./View/Home";
import Detail from "./View/Detail/Detail";
import NavBar from "./component/NavBar/NavBar";
import { Route, Routes } from "react-router-dom";
import RegisterLogin from "./component/RegisterLogin/RegisterLogin";

function App() {
  return (
    <>
      <NavBar />
      <RegisterLogin />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/detail/:id" element={<Detail />} />
      </Routes>
    </>
  );
}

export default App;
