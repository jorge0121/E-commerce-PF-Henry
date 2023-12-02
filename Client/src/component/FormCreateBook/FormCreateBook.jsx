import { useForm } from 'react-hook-form';
import 'bulma/css/bulma.min.css';
import styles from './Form.module.css'
import axios from 'axios';
import { uploadImage } from '../../firebase-config';
import { useState } from 'react';



const FormCreateBook = () => {
  
 const [file, setFile] = useState(null)
  const { register, handleSubmit, formState:{errors},setValue,reset} = useForm();

  const onSubmit = async(data) => {
    
    
    try {
              const url = await uploadImage(file);
              
              
      // Realizo la petición Axios con los datos del formulario
      const arrayData = [data];
      arrayData[0].image = url
      console.log(arrayData);
      
      const response = await axios.post('https://server-pf.onrender.com/book/bulke', arrayData);
      
     
      // Limpio el formulario después del éxito
      alert("Enviando Datos..")
      reset();
    } catch (error) {
      if (error.response) {
       
        console.error('Error en la respuesta del servidor:', error.response.data);
      } else if (error.request) {
        
        console.error('No se recibió respuesta del servidor');
      } else {
       
        console.error('Error al enviar la solicitud:', error.message);
      }
    }
  }
  

  return (
    <>
    
    <h2>Nuevo Libro </h2>
    <form className={styles.container} onSubmit={handleSubmit(onSubmit)}>
    <div>
        <label   className="label">Titulo:</label>
        <input   className={`input ${errors.title ? 'is-danger' : ''} input is-link`} type="text" {...register("title",{
          required:{
            value:true,
            message:"Name required"
          },
          minLength:{
            value:2,
            message:"Mínimo dos caracteres"
          },maxLength:{
            value:20,
            message:"Máximo 20 caracteres"
          }
          
        })}
        />
        {errors.title && <span className="help is-danger">{errors.title.message}</span> }
        
       
      </div>

      <div>
        <label className="label">Autor:</label>
        <input  className={`input ${errors.author ? 'is-danger' : ''} input is-link`} type="text" {...register("author",{
          required:{
            value:true,
            message:"Author required"
          },
          minLength:{
            value:2,
            message:"Mínimo dos caracteres"
          },maxLength:{
            value:20,
            message:"Máximo 20 caracteres"
          }
          
        })}
        />
        {errors.author && <span className="help is-danger">{errors.author.message}</span> }
      </div>
        
      <div>
        <label className="label">Genero:</label>
        <select {...register("gender", {required:{value:true,message:"Genero requerido"}})}>
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
     
        {errors.gender && <span className="help is-danger">{errors.gender.message}</span> }
      </div>

      <div>
        <label className="label">Año:</label>
        <input  className={`input ${errors.year ? 'is-danger' : ''} input is-link`} type="number" {...register("year",{
          required:{
            value:true,
            message:"Year required"
          },
          minLength:{
            value:4,
            message:"Mínimo cuatro caracteres"
          },maxLength:{
            value:20,
            message:"Máximo 20 caracteres"
          }
          
        })}
        />
        {errors.year && <span className="help is-danger">{errors.year.message}</span> }
      </div>

      <div>
        <label className="label">Precio:</label>
        <input  className={`input ${errors.price ? 'is-danger' : ''} input is-link`} type="number" {...register("price",{
          required:{
            value:true,
            message:"Price required"
          },
          min:{
            value:0,
            message:"El precio debe ser mayor a cero"
          }
          
        })}
        />
        {errors.price && <span className="help is-danger">{errors.price.message}</span> }
      </div>

      <div>
        <label className="label">Páginas:</label>
        <input  className={`input ${errors.pages ? 'is-danger' : ''} input is-link`} type="text" {...register("pages",{
          required:{
            value:true,
            message:"Pages required"
          },
          min:{
            value:0,
            message:"El número debe ser mayor a cero"
          }
          
        })}
        />
        {errors.pages && <span className="help is-danger">{errors.pages.message}</span> }
      </div>
      <div>
        <label className="label">Descripción:</label>
        <input  className={`input ${errors.description ? 'is-danger' : ''} input is-link`} type="text" {...register("description",{
          required:{
            value:true,
            message:"Descriptión required"
          },
          minLength:{
            value:10,
            message:"Mínimo 10 caracteres"
          },maxLength:{
            value:100,
            message:"Máximo 100 caracteres"
          }
          
        })}
        />
        {errors.description && <span className="help is-danger">{errors.description.message}</span> }
      </div>
      <div>
        <label className='label'>Activo:</label>
        <select {...register("active", {required:{value:true,message:"Genero requerido"}})}>
          <option value="true">Si</option>
          <option value="false">No</option>
        </select>
      </div>
      <div>
        <label className="label">Imagen:</label>
        <input  type="file" onChange={(e)=>{setValue('image', setFile((e.target.files[0])))}}/>
      </div>
        
        
       
        
      <button className="button is-primary" type='submit'>Crear Libro</button>
      </form>
    </>



  )
  }

export default FormCreateBook ;