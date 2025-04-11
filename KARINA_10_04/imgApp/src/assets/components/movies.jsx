import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './style.css';
const Movies = () => {
  const imagenes = [
    {
      src: '/dragon-ball.jpg',
      titulo: 'Dragon Ball',
      descripcion: 'Dragon Ball es una serie animada japonesa que narra las aventuras de Son Goku, un guerrero saiyajin que viaja en busca de las esferas del dragón. Goku es un experto en artes marciales que protege la Tierra de villanos. s una franquicia de manga, anime, y videojuegos que narra las aventuras de Son Goku, un guerrero saiyajin que lucha por proteger la Tierra.',
    },
    {
      src: '/jujutsu-kaisen.jpg',
      titulo: 'Jujutsu Kaisen',
      descripcion: 'cuenta la historia de Yuji Itadori, un estudiante de secundaria con fuerza sobrenatural, quien se ve involucrado en el mundo de las maldiciones y hechiceros después de un encuentro con seres malvados que se alimentan de energía negativa. ',
    },
    {
      src: '/naruto.jpg',
      titulo: 'Naruto',
      descripcion: 'Naruto es la historia de Naruto Uzumaki, un ninja adolescente que sueña con ser Hokage, el líder de su aldea. Naruto tiene encerrado en su interior al Zorro Demonio de Nueve Colas. ',
    },
    {
      src: '/one-piece.jpg',
      titulo: 'One Piece',
      descripcion: 'ne Piece es una historia de aventuras y acción sobre un joven que busca un tesoro y convertirse en el Rey de los Piratas',
    },
  ];

  return (
    
    <div className="contenedor-imagenes row d-flex justify-content-center">
         <h1>Lista de Peliculas</h1>
        <div className="col-8">
            {imagenes.map((img, index) => (
            <div className="card mt-2 cards">
                <img src={img.src} alt={`Imagen de ${img.titulo} - ${index}`} className="imagen card-img-top" />                
                <div className="card-body">
                    <div key={index} className="imagen-item">
                        <div className="card-title text-danger fs-3">{img.titulo}</div>
                        <p className="descripcion">{img.descripcion}</p>
                    </div>
                </div>
            </div>
            ))}
        </div>
    </div>
  );
};

export default Movies;
