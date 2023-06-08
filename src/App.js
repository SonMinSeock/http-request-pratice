import React, { useCallback, useEffect, useState } from "react";

import MoviesList from "./components/MoviesList";
import AddMovie from "./components/AddMovie";
import "./App.css";

function App() {
  const [movies, setMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [addMovie, setAddMovie] = useState({});

  const fetchMovieHandler = useCallback(async () => {
    try {
      setIsLoading(true);

      setError(null);

      const res = await fetch(
        "https://react-http-cd376-default-rtdb.firebaseio.com/movies.json"
      );

      if (!res.ok) {
        throw new Error("Something Worng!");
      }

      const data = await res.json();

      const loadedMovies = [];

      for (const key in data) {
        loadedMovies.push({ id: key, ...data[key] });
      }

      setMovies(loadedMovies);

      setIsLoading(false);
    } catch (err) {
      setError(err.message);
    }
    setIsLoading(false);
  }, []);

  useEffect(() => {
    fetchMovieHandler();
  }, [fetchMovieHandler, addMovie]);

  let content = <p>Found No Movies.</p>;

  if (movies.length > 0) {
    content = <MoviesList movies={movies} />;
  }

  if (error) {
    content = <p>{error}</p>;
  }

  if (isLoading) {
    content = <p>Loadding...</p>;
  }

  async function addMovieHandler(movie) {
    try {
      setError(null);

      const res = await fetch(
        "https://react-http-cd376-default-rtdb.firebaseio.com/movies.json",
        {
          method: "POST",
          body: JSON.stringify(movie),
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (!res.ok) {
        throw new Error("Error Form Fetch POST...");
      }

      const data = await res.json();
      console.log(`AddMovieHandler POST Response Data : ${data}`);
      setAddMovie(data);
    } catch (err) {
      setError(err.message);
    }
  }

  return (
    <React.Fragment>
      <section>
        <AddMovie onAddMovie={addMovieHandler} />
      </section>
      <section>
        <button onClick={fetchMovieHandler}>Fetch Movies</button>
      </section>
      <section>
        {/* {!isLoading && movies.length > 0 && <MoviesList movies={movies} />}
        {!isLoading && movies.length === 0 && !error && <p>Found No Movies.</p>}
        {!isLoading && error && <p>{error}</p>}
        {isLoading && <p>Loadding...</p>} */}
        {content}
      </section>
    </React.Fragment>
  );
}

export default App;
