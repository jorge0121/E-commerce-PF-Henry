import axios from "axios";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import {
  unSetSendUser,
} from "../../redux/reducers/SendUser/sendUserSlice";


function Success() {
const dispatch=useDispatch()

  const { totalUSD, userName, userEmail, userAddress } = useSelector(
    (state) => state.sendUser
  );
// dispatch(unSetSendUser());

  useEffect(() => {
    const sendEmail = async () => {
      const { data } = await axios.post(
        `https://e-commerce-pf-henry.onrender.com/send-email?userEmail=${userEmail}&totalUSD=${totalUSD}&booksName=&userName=${userName}&userAddress=${userAddress}`
      );
    };
  }, []);

  return (
    <div>
      <h1>Pago Exitoso</h1>

      <span>Gracias por su compra</span>
      <Link to={"/"}>
        <button>Volver al inicio</button>
      </Link>
    </div>
  );
}

export default Success;
