import { useCallback, useEffect, useState } from "react";
import { SERVER_URL } from "../request";

const MAX_LIKED = 5;

export function useGetLikedMovies({ likedMovieListById }) {
  const [likedMovieData, setLikedMovieData] = useState([]);
  const [loading, setLoading] = useState(true);

  const handleSplittingLiked = useCallback((movieList) => {
    const firstHalf = movieList.slice(0, Math.ceil(movieList.length / 2));
    const secondHalf = movieList.slice(Math.ceil(movieList.length / 2));

    firstHalf.forEach((movieId) => {
      fetch(`${SERVER_URL}/movies/${movieId}`)
        .then((res) => res.json())
        .then((movie) => {
          if (movie) {
            setLikedMovieData((likedMovies) => [...likedMovies, movie]);
          }
        });
    });
    setLoading(false);

    secondHalf.forEach((movieId) => {
      fetch(`${SERVER_URL}/movies/${movieId}`)
        .then((res) => res.json())
        .then((movie) => {
          if (movie) {
            setLikedMovieData((likedMovies) => [...likedMovies, movie]);
          }
        });
    });
  }, []);

  useEffect(() => {
    if (!likedMovieListById) return;
    if (likedMovieListById.length < MAX_LIKED) {
      likedMovieListById.forEach((movieId, i) => {
        fetch(`${SERVER_URL}/movies/${movieId}`)
          .then((res) => res.json())
          .then((movie) => {
            if (movie) {
              setLikedMovieData([]);
              setLikedMovieData((likedMovies) => [...likedMovies, movie]);
            }
          });
      });
      setLoading(false);
    } else handleSplittingLiked(likedMovieListById);
  }, [handleSplittingLiked, likedMovieListById]);

  return { likedMovieData: [...new Set(likedMovieData)], loading };
}
