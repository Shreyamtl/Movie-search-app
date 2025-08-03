import React from "react";

const MovieCard = ({ movie, isFavourite, onFavClick, onClick }) => (
  <div className="card" onClick={onClick} style={{ cursor: "pointer" }}>
    <img
      src={movie.Poster !== "N/A" ? movie.Poster : "https://via.placeholder.com/150"}
      alt={movie.Title}
    />
    <div className="card-body">
      <h3>{movie.Title}</h3>
      <p>{movie.Year}</p>
      <button
        onClick={(e) => {
          e.stopPropagation(); // 👈 prevents triggering movie detail when clicking favorite
          onFavClick();
        }}
      >
        {isFavourite ? "✖ Remove" : "Add to Favourite ★"}
      </button>
    </div>
  </div>
);

export default MovieCard;
