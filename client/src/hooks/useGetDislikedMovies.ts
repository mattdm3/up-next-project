import { useCallback, useEffect, useState } from "react";
import { serverUrl } from "../components/LoginContext";
const MAX_LIKED = 5;
export function useGetDislikedMovies({ dislikedMovieListById }) {
  const [dislikedMovieData, setDislikedMovieData] = useState([]);
  const [loading, setLoading] = useState(true);

  const handleSplittingDisliked = useCallback((movieList) => {
    const firstHalf = movieList.slice(0, Math.ceil(movieList.length / 2));
    const secondHalf = movieList.slice(Math.ceil(movieList.length / 2));

    firstHalf.forEach((movieId) => {
      fetch(`${serverUrl}/movies/${movieId}`)
        .then((res) => res.json())
        .then((movie) => {
          if (movie) {
            setDislikedMovieData((dislikedMovies) => [
              ...dislikedMovies,
              movie,
            ]);
          }
        });
    });
    setLoading(false);

    secondHalf.forEach((movieId) => {
      fetch(`${serverUrl}/movies/${movieId}`)
        .then((res) => res.json())
        .then((movie) => {
          if (movie) {
            setDislikedMovieData((dislikedMovies) => [
              ...dislikedMovies,
              movie,
            ]);
          }
        });
    });
  }, []);
  useEffect(() => {
    if (!dislikedMovieListById) return;
    if (dislikedMovieListById.length < MAX_LIKED) {
      dislikedMovieListById.forEach((movieId, i) => {
        fetch(`${serverUrl}/movies/${movieId}`)
          .then((res) => res.json())
          .then((movie) => {
            if (movie) {
              setDislikedMovieData((dislikedMovies) => [
                ...dislikedMovies,
                movie,
              ]);
            }
          });
      });
      setLoading(false);
    } else handleSplittingDisliked(dislikedMovieListById);
  }, [dislikedMovieListById, handleSplittingDisliked]);

  return { dislikedMovieData, loading };
}
