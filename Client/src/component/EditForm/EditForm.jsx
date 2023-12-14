import React, { useState, useEffect } from 'react';
import Modal from 'react-modal';
import axios from 'axios';
import { useForm,Controller } from "react-hook-form";
import styles from './EditForm.module.css'
import './stylesModal.css'

const EditFormModal = ({ isOpen, onClose, book, onUpdate }) => {
  const [editedBook, setEditedBook] = useState({ ...book });
  const {
    handleSubmit,
    control,
    register,
    setValue,
    formState: { errors },
  } = useForm({
    defaultValues: { ...book },
  });


  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditedBook((prevBook) => ({
      ...prevBook,
      [name]: value,
    }));
  };

  const handleUpdate = async (data) => {
    try {
      const updatedBook = { ...book, ...data };
      const response = await axios.put(`https://e-commerce-pf-henry.onrender.com/book/update/${book.id}`, updatedBook);
    
      onUpdate(updatedBook);
      onClose();
    } catch (error) {
      console.error('Error updating book:', error);
    }
  };

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onClose}
      contentLabel="Editar Libro"
      ariaHideApp={false}
     className="modal1"

      
     
    >
      <h2 className="title is-4">Actualizar Libro</h2>
      <form className={styles.container} onSubmit={handleSubmit(handleUpdate)}>
        <div>
          <label className="label">Titulo:</label>
          <input
            className={`input ${errors.title ? "is-danger" : ""} input is-link`}
            type="text"
            {...register("title", {
              required: {
                value: true,
                message: "Name required",
              },
              minLength: {
                value: 2,
                message: "Mínimo dos caracteres",
              },
              maxLength: {
                value: 20,
                message: "Máximo 20 caracteres",
              },
            })}
           onChange={handleInputChange}/>
          {errors.title && (
            <span className="help is-danger">{errors.title.message}</span>
          )}
        </div>

        <div>
          <label className="label">Autor:</label>
          <input
            className={`input ${
              errors.author ? "is-danger" : ""
            } input is-link`}
            type="text"
            {...register("author", {
              required: {
                value: true,
                message: "Author required",
              },
              minLength: {
                value: 2,
                message: "Mínimo dos caracteres",
              },
              maxLength: {
                value: 20,
                message: "Máximo 20 caracteres",
              },
            })}
            onChange={handleInputChange}/>
          {errors.author && (
            <span className="help is-danger">{errors.author.message}</span>
          )}
        </div>

        <div>
          <label className="label">Genero:</label>
          <select
            {...register("gender", {
              required: { value: true, message: "Genero requerido" },
            })}
          >
            <option value="literatura">Literatura</option>
            <option value="historia">Historia</option>
            <option value="fantasía">Fantasía</option>
            <option value="Realismo mágico">Realismo mágico</option>
            <option value="Ciencia ficción">Ciencia ficción</option>
            <option value="Romance">Romance</option>
            <option value="Drama">Drama</option>
            <option value="Novela">Novela</option>
            <option value="Beat Generation">Beat Generation</option>
          </select>

          {errors.gender && (
            <span className="help is-danger">{errors.gender.message}</span>
          )}
        </div>

        <div>
          <label className="label">Año:</label>
          <input
            className={`input ${errors.year ? "is-danger" : ""} input is-link`}
            type="number"
            {...register("year", {
              required: {
                value: true,
                message: "Year required",
              },
              minLength: {
                value: 4,
                message: "Mínimo cuatro caracteres",
              },
              maxLength: {
                value: 20,
                message: "Máximo 20 caracteres",
              },
            })}
            onChange={handleInputChange}/>
          {errors.year && (
            <span className="help is-danger">{errors.year.message}</span>
          )}
        </div>

        <div>
          <label className="label">Precio:</label>
          <input
            className={`input ${errors.price ? "is-danger" : ""} input is-link`}
            type="number"
            {...register("price", {
              required: {
                value: true,
                message: "Price required",
              },
              min: {
                value: 0,
                message: "El precio debe ser mayor a cero",
              },
            })}
            onChange={handleInputChange}/>
          {errors.price && (
            <span className="help is-danger">{errors.price.message}</span>
          )}
        </div>

        <div>
          <label className="label">Páginas:</label>
          <input
            className={`input ${errors.pages ? "is-danger" : ""} input is-link`}
            type="text"
            {...register("pages", {
              required: {
                value: true,
                message: "Pages required",
              },
              min: {
                value: 0,
                message: "El número debe ser mayor a cero",
              },
            })}
            onChange={handleInputChange}/>
          {errors.pages && (
            <span className="help is-danger">{errors.pages.message}</span>
          )}
        </div>
        <div>
          <label className="label">Descripción:</label>
          <input
            className={`input ${
              errors.description ? "is-danger" : ""
            } input is-link`}
            type="text"
            {...register("description", {
              required: {
                value: true,
                message: "Descriptión required",
              },
              minLength: {
                value: 10,
                message: "Mínimo 10 caracteres",
              },
              maxLength: {
                value: 100,
                message: "Máximo 100 caracteres",
              },
            })}
            onChange={handleInputChange}/>
          {errors.description && (
            <span className="help is-danger">{errors.description.message}</span>
          )}
        </div>
        
        {/*<div>
          <label className="label">Imagen:</label>
          <input
            type="file"
            onChange={(e) => {
              setValue("image", setFile(e.target.files[0]));
            }}
          />
        </div>*/}
         <button type="submit" className="button is-primary is-small">Guardar Cambios</button>
        <button type="button" onClick={onClose} className="button is-danger is-small">
          Cancelar
        </button>
      </form>
    </Modal>
  );
};

export default EditFormModal;