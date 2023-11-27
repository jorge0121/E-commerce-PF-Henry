import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setUser, unSetUser } from "../../redux/reducers/Users/UserSlice";
import { auth } from "../../firebase-config";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  updateProfile,
  signOut,
} from "firebase/auth";

function RegisterLogin() {
  const dispatch = useDispatch();
  const { name } = useSelector((state) => state.user);

  const [emailRegistrer, setEmailRegistrer] = useState("");
  const [passwordRegistrer, setPasswordRegistrer] = useState("");
  const [nameRegistrer, setNameRegistrer] = useState("");
  const [emailLogin, setEmailLogin] = useState("");
  const [passwordLogin, setPasswordLogin] = useState("");

  const registerHandler = async () => {
    try {
      const credentials = await createUserWithEmailAndPassword(
        auth,
        emailRegistrer,
        passwordRegistrer
      );
      if (credentials) {
        await updateProfile(auth.currentUser, {
          displayName: nameRegistrer,
        });
        const userId = credentials.user.uid;
        const userNombre = credentials.user.displayName;
        const userEmail = credentials.user.email;
        dispatch(setUser({ id: userId, name: userNombre, email: userEmail }));
        if (name) {
          setEmailRegistrer("");
          setPasswordRegistrer("");
          setNameRegistrer("");
        }
      }
    } catch (error) {
      console.log("error.message", error.message);
    }
  };

  const loginHandler = async () => {
    try {
      const user = await signInWithEmailAndPassword(
        auth,
        emailLogin,
        passwordLogin
      );
      if (user) {
        const userId = user.user.uid;
        const userNombre = user.user.displayName;
        const userEmail = user.user.email;
        dispatch(setUser({ id: userId, name: userNombre, email: userEmail }));
        if (name) {
          setEmailLogin("");
          setPasswordLogin("");
        }
      }
    } catch (error) {
      console.log("error.message", error.message);
    }
  };

  const logoutHandler = async () => {
    await signOut(auth);
    dispatch(unSetUser());
  };

  return (
    <>
      {name ? (
        <>
          <hr />
          <h3>Bienvenido, {name}</h3>
          <button onClick={logoutHandler}>Logout</button>
          <hr />
        </>
      ) : (
        <>
          <hr />
          <h2>REGISTRARSE</h2>
          <label htmlFor="emailRegis">Email: </label>
          <input
            id="emailRegis"
            type="text"
            name="email"
            onChange={(event) => {
              setEmailRegistrer(event.target.value);
            }}
          />
          <label htmlFor="passwordRegis">Password: </label>
          <input
            id="passwordRegis"
            type="password"
            name="password"
            onChange={(event) => {
              setPasswordRegistrer(event.target.value);
            }}
          />
          <label htmlFor="nombreRegis">Nombre: </label>
          <input
            id="nombreRegis"
            type="nombre "
            name="nombre "
            onChange={(event) => {
              setNameRegistrer(event.target.value);
            }}
          />
          <br />
          <button onClick={registerHandler}>Registrarse</button>
          <h2>LOGIN</h2>
          <label htmlFor="emailLog">Email: </label>
          <input
            id="emailLog"
            type="text"
            name="email"
            onChange={(event) => {
              setEmailLogin(event.target.value);
            }}
          />
          <label htmlFor="passwordLog">Password: </label>
          <input
            id="passwordLog"
            type="password"
            name="password"
            onChange={(event) => {
              setPasswordLogin(event.target.value);
            }}
          />
          <br />
          <button onClick={loginHandler}>Login</button>
          <hr />
        </>
      )}
    </>
  );
}

export default RegisterLogin;
