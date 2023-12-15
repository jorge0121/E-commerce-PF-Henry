import React from "react";
import { Link } from "react-router-dom";

function Success() {
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
