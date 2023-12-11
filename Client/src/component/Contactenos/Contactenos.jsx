import { useState } from "react";
import { useForm } from "react-hook-form";
import ContacHandler from "../../handlers/ContacHandler/ContacHandler";

function Contactenos() {
  const [contact, setContact] = useState({
    name: "",
    email: "",
    phone: "",
    descrption: "",
  });

  const { onSubmit } = ContacHandler();

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    reset,
  } = useForm();

  return (
    <>
      <br />
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="field">
          <label className="label">Nombre</label>
          <div className="control"></div>
          <input
            className={`input ${errors.nombre ? "input is-danger" : ""}`}
            type="text"
            {...register("nombre", {
              required: {
                value: true,
                message: "Nombre requerido",
              },
              minLength: {
                value: 4,
                message: "Mínimo 4 caracteres",
              },
              maxLength: {
                value: 20,
                message: "Máximo 20 caracteres",
              },
            })}
            placeholder="escribe tu nombre"
          />
          {errors.nombre && (
            <span className="help is-danger">{errors.nombre.message}</span>
          )}
        </div>
        <div className="field">
          <label className="label">Email</label>
          <div className="control">
            <input
              className={`input ${errors.email ? "input is-danger" : ""}`}
              type="email"
              {...register("email", {
                required: {
                  value: true,
                  message: "Nombre requerido",
                },
                minLength: {
                  value: 4,
                  message: "Mínimo 4 caracteres",
                },
                maxLength: {
                  value: 20,
                  message: "Máximo 20 caracteres",
                },
              })}
              placeholder="tu-email@email.com"
            />
            {errors.email && (
              <span className="help is-danger">{errors.email.message}</span>
            )}
          </div>
        </div>
        <div className="field">
          <label className="label">Mensaje</label>
          <div className="control">
            <textarea
              className={`textarea has-fixed-size ${
                errors.mensaje ? "textarea is-danger" : ""
              }`}
              {...register("mensaje", {
                required: {
                  value: true,
                  message: "Este campo es requerido",
                },
                minLength: {
                  value: 4,
                  message: "Mínimo 4 caracteres",
                },
                maxLength: {
                  value: 50,
                  message: "Máximo 50 caracteres",
                },
              })}
              placeholder="dejanos tu mensaje..."
            ></textarea>
            {errors.mensaje && (
              <span className="help is-danger">{errors.mensaje.message}</span>
            )}
          </div>
        </div>
        <div className="control">
          <button className="button is-link">Enviar</button>
        </div>
      </form>
    </>
  );
}

export default Contactenos;
