import React, { useState } from "react";

import MoviesList from "./components/MoviesList";
import "./App.css";

function App() {
  const [movies, setMovies] = useState([]);
  const [isLoadding, setIsLoadding] = useState(false);

  async function fetchMovieHandler() {
    try {
      setIsLoadding(true);
      const res = await fetch("https://swapi.dev/api/films");
      const data = await res.json();
      const transformMovies = data.results.map((movie) => {
        return {
          id: movie.episode_id,
          title: movie.title,
          openingText: movie.opening_crawl,
          releaseDate: movie.release_date,
        };
      });
      setMovies(transformMovies);
      setIsLoadding(false);
    } catch (err) {
      console.log(err);
    }
  }

  return (
    <React.Fragment>
      <section>
        <button onClick={fetchMovieHandler}>Fetch Movies</button>
      </section>
      <section>
        {!isLoadding && movies.length > 0 && <MoviesList movies={movies} />}
        {!isLoadding && movies.length === 0 && <p>Found No Movies.</p>}
        {isLoadding && <p>Loadding...</p>}
      </section>
    </React.Fragment>
  );
}

export default App;
