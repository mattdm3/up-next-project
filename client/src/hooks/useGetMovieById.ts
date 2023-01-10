import useSwr from "swr";

import { request, SERVER_URL } from "../request";

export function useGetMovieById({ movieId }) {
  const key = `${SERVER_URL}/movies/${movieId}`;
  const { data, error } = useSwr(movieId ? key : null, request);

  return { selectedMovieData: data, error };
}
