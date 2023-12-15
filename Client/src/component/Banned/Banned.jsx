import { unSetUser } from "../../redux/reducers/Users/UserSlice";
import { useDispatch } from "react-redux";
import { auth } from "../../firebase-config";
import { signOut } from "firebase/auth";

function Banned() {
  const dispatch = useDispatch();

  const logoutHandler = async () => {
    await signOut(auth);
    dispatch(unSetUser());
  };

  return (
    <div className="content">
      <h1>
        Tu perfil esta baneado, favor regresa a la pagina Home desde el
        siguiente boton:
      </h1>
      <button onClick={logoutHandler}>Atras</button>
    </div>
  );
}

export default Banned;
