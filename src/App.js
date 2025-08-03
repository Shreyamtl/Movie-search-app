
import React, { useState, useEffect } from "react";
import MovieCard from "./MovieCard";
import "./styles.css";

const API_KEY = "" ; // Replace with OMDb API key

const App = () => {
  const [query, setQuery] = useState("");
  const [movies, setMovies] = useState([]);
  const [selectedMovie, setSelectedMovie] = useState(null);
  const [favourites, setFavourites] = useState(() => {
    return JSON.parse(localStorage.getItem("favourites")) || [];
  });

  const fetchMovies = async () => {
    const res = await fetch(`https://www.omdbapi.com/?s=${query}&apikey=API_KEY`);
    const data = await res.json();
    if (data.Search) setMovies(data.Search);
    else setMovies([]);
  };

   const fetchMovieDetails = async (id) => {
    const res = await fetch(`https://www.omdbapi.com/?i=${id}&apikey=API_KEY`);
    const data = await res.json();
    setSelectedMovie(data);
  };
  const toggleFavourite = (movie) => {
    const exists = favourites.find(m => m.imdbID === movie.imdbID);
    const updated = exists
      ? favourites.filter(m => m.imdbID !== movie.imdbID)
      : [...favourites, movie];
    setFavourites(updated);
    localStorage.setItem("favourites", JSON.stringify(updated));
  };

  return (
    <div className="container">
      <h1> MovieMap : "Navigate your next favorite movie 🎬" </h1>
      <input
        type="text"
        placeholder="Search movies..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        onKeyDown={(e) => e.key === "Enter" && fetchMovies()}
      />

      <div className="movie-list">
        {movies.map((movie) => (
          <MovieCard
            key={movie.imdbID}
            movie={movie}
            isFavourite={favourites.some(f => f.imdbID === movie.imdbID)}
            onFavClick={() => toggleFavourite(movie)}
            onClick={() => fetchMovieDetails(movie.imdbID)}
          />
        ))}
      </div>

      <h2>⭐ Favourites</h2>
      <div className="movie-list">
        {favourites.map((movie) => (
          <MovieCard
            key={movie.imdbID}
            movie={movie}
            isFavourite={true}
            onFavClick={() => toggleFavourite(movie)}
            onClick={() => fetchMovieDetails(movie.imdbID)}
          />
        ))}
      </div>

      
      {selectedMovie && (
        <div className="movie-detail">
          <h2>{selectedMovie.Title} ({selectedMovie.Year})</h2>
          <p><strong>Genre:</strong> {selectedMovie.Genre}</p>
          <p><strong>Plot:</strong> {selectedMovie.Plot}</p>
          <p><strong>Actors:</strong> {selectedMovie.Actors}</p>
          <p><strong>Rating:</strong> {selectedMovie.imdbRating}</p>
          <button onClick={() => setSelectedMovie(null)}>Close</button>
        </div>
      )}

    </div>

  );
};

export default App;
