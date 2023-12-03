import "./RegisterLogin.css";
import "bulma/css/bulma.css";
import axios from "axios";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setUser, unSetUser } from "../../redux/reducers/Users/UserSlice";
import { auth, provider } from "../../firebase-config";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  updateProfile,
  signOut,
  signInWithPopup,
} from "firebase/auth";

//https://server-pf.onrender.com/user?page=1  GET para admins
//https://server-pf.onrender.com/comment?1?userId=TYD3igvyP8gfEdEqx9CVJC5g2Re2  modificar usuarios

function RegisterLogin() {
  const dispatch = useDispatch();
  const { name } = useSelector((state) => state.user);

  const [emailRegistrer, setEmailRegistrer] = useState("");
  const [passwordRegistrer, setPasswordRegistrer] = useState("");
  const [nameRegistrer, setNameRegistrer] = useState("");
  const [emailLogin, setEmailLogin] = useState("");
  const [passwordLogin, setPasswordLogin] = useState("");
  const [ingresar, setIngresar] = useState(false);
  const [isModal, setIsModal] = useState(false);

  const active = isModal ? "is-active" : "";

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
        try {
          const id = userId;
          const name = userNombre;
          const email = userEmail;
          await axios(`https://server-pf.onrender.com/user/`, id, name, email);
        } catch (error) {
          console.log("errorAxios", error);
        }
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
        const id = user.user.uid;
        const name = user.user.displayName;
        const email = user.user.email;
        if (id) {
          const { data } = await axios(
            `https://server-pf.onrender.com/user/client?id=${id}`
          );
          if (data) {
            const admin = data.admin;
            dispatch(setUser({ id, name, email, admin }));
          }
        }
        if (name) {
          setEmailLogin("");
          setPasswordLogin("");
        }
      }
    } catch (error) {
      console.log("error.message", error.message);
    }
  };

  const loginWithGoogle = async () => {
    try {
      const user = await signInWithPopup(auth, provider);
      if (user) {
        const id = user.user.uid;
        const name = user.user.displayName;
        const email = user.user.email;
        if (id) {
          const { data } = await axios(
            `https://server-pf.onrender.com/user/client?id=${id}`
          );
          if (data) {
            const admin = data.admin;
            dispatch(setUser({ id, name, email, admin }));
          }
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
          <h3 className="bienvenido">Bienvenido, {name} </h3>
          <button className="buttonLogout" onClick={logoutHandler}>
            Logout
          </button>
        </>
      ) : (
        <>
          <button
            className="buttonLogin"
            onClick={() => {
              setIsModal(!isModal);
            }}
          >
            Ingresar
          </button>
          <div className={`modal ${active}`}>
            <div className="modal-background" />
            <div className="modal-card">
              <button
                onClick={() => {
                  setIsModal(!isModal);
                  setIngresar(false);
                }}
                className="delete"
                aria-label="close"
              />
              {!ingresar ? (
                <>
                  <hr />
                  <h2>REGISTRARSE</h2>
                  <label htmlFor="emailRegis">Correo: </label>
                  <input
                    id="emailRegis"
                    type="text"
                    name="email"
                    onChange={(event) => {
                      setEmailRegistrer(event.target.value);
                    }}
                  />
                  <label htmlFor="passwordRegis">Contraseña: </label>
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
                  <button className="buttonLogin" onClick={registerHandler}>
                    Registrarse
                  </button>{" "}
                  <br />
                  <button className="buttonLogin" onClick={loginWithGoogle}>
                    Ingresar con Google
                  </button>
                  <h4>O</h4>
                </>
              ) : (
                <>
                  <hr />
                  <h2>INGRESAR</h2>
                  <label htmlFor="emailLog">Correo: </label>
                  <input
                    id="emailLog"
                    type="text"
                    name="email"
                    onChange={(event) => {
                      setEmailLogin(event.target.value);
                    }}
                  />
                  <label htmlFor="passwordLog">Contraseña: </label>
                  <input
                    id="passwordLog"
                    type="password"
                    name="password"
                    onChange={(event) => {
                      setPasswordLogin(event.target.value);
                    }}
                  />
                  <br />
                  <button className="buttonLogin" onClick={loginHandler}>
                    Ingresar
                  </button>
                  <br />
                </>
              )}
              <button
                className="buttonLogin"
                onClick={() => {
                  setIngresar(!ingresar);
                }}
              >
                {ingresar ? "Volver" : "Ingresar con correo"}
              </button>
            </div>
          </div>
        </>
      )}
    </>
  );
}

export default RegisterLogin;
