import { useEffect, useState } from "react";
import { serverUrl } from "../components/LoginContext";

export function useGetLikedMovies({ likedMovieListById }) {
  const [likedMovieData, setLikedMovieData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!likedMovieListById) return;
    const requests = likedMovieListById.map((movieId) =>
      fetch(`${serverUrl}/movies/${movieId}`).then((res) => res.json())
    );
    Promise.all(requests).then((data) => {
      setLikedMovieData((likedMovies) => [...likedMovies, ...data]);
      setLoading(false);
    });
  }, [likedMovieListById]);

  return { likedMovieData, loading };
}
