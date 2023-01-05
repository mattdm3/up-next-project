import { useEffect, useState } from "react";
import { serverUrl } from "../components/LoginContext";

export function useGetDislikedMovies({ dislikedMovieListById }) {
  const [dislikedMovieData, setLikedMovieData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!dislikedMovieListById) return;
    const requests = dislikedMovieListById?.map((movieId) =>
      fetch(`${serverUrl}/movies/${movieId}`).then((res) => res.json())
    );
    Promise.all(requests).then((data) => {
      setLikedMovieData((dislikedMovie) => [...dislikedMovie, ...data]);
      setLoading(false);
    });
  }, [dislikedMovieListById]);

  return { dislikedMovieData, loading };
}
