import React, { useState } from "react";

export const BuscadorPeliculas = () => {
    const urlBase = 'https://api.themoviedb.org/3/search/movie'; // pongo la URL
    const API_KEY = '9f9492438351da91b0f06d5e0d619422';

    const [Busqueda, setBusqueda] = useState(''); // esto es lo que va a buscar
    const [peliculas, setPeliculas] = useState([]); // esto va a ser lo que me traiga las peliculas

    const handleInputChange = (e) => {
        setBusqueda(e.target.value);
    };

    const handleSubmit = async (e) => {
        e.preventDefault(); // prevenir que se actualize pagina
        await fetchPeliculas();
    };

    const fetchPeliculas = async () => {
        try {
            const response = await fetch(`${urlBase}?query=${Busqueda}&api_key=${API_KEY}`);
            const data = await response.json();
            setPeliculas(data.results); // en vez de solo data, deberías usar data.results que es la lista de películas
        } catch (error) {
            console.error('Ha ocurrido un error: ', error);
        }
    };

    return (
        <div className="container">
            <h1 className="title">Buscador de peliculas</h1>
            <form onSubmit={handleSubmit}>
                <input 
                    type="text" 
                    placeholder="Escribí una pelicula"
                    value={Busqueda}
                    onChange={handleInputChange}
                />
                <button type="submit" className="search-button">Buscar</button>
            </form>
            <div className="movie-list">
                {peliculas.length > 0 ? (
                    peliculas.map((pelicula) => (
                        <div key={pelicula.id} className="movie-card">
                            <img src={`https://image.tmdb.org/t/p/w500/${pelicula.poster_path}`} alt={pelicula.title} />
                            <h2>{pelicula.title}</h2>
                            <p>{pelicula.overview}</p>
                        </div>
                    ))
                ) : (
                    <p>No se encontraron películas.</p>
                )}
            </div>
        </div>
    );
};