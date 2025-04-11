import React, {useState} from 'react'
import './style.css'; //importamos el css
export const Formulario =()=> {
    const [nombre, setNombre]= useState('');
    const [correo, setCorreo]= useState('');
    const [mensaje, setMensaje]= useState('');

    const manejarEnvio = (e) =>{
        e.preventDefault();
        setMensaje(`Bienvenido(a) ${nombre}, su correo es ${correo}`);
    };

  return (
    <div className='contenedor-formulario'>
        <h2>Formulario de Registro</h2>
        <form onSubmit={manejarEnvio}>
            <label>
                Nombre: <input type='text' value={nombre}
                onChange={(e)=> setNombre(e.target.value)} required/>
            </label>

            <label>
                Correo: <input type='email' value={correo}
                onChange={(e)=> setCorreo(e.target.value)} required/>
            </label>

            <button type='submit'>Registrarse</button>
        </form>
        {mensaje && <p className="mensaje">{mensaje}</p>}

    </div>
  );
}
