import useSwr from "swr";
import { serverUrl } from "../components/LoginContext";
import { request } from "../request";

export function useGetMovieById({ movieId }) {
  const key = `${serverUrl}/movies/${movieId}`;
  const { data, error } = useSwr(movieId ? key : null, request);

  return { selectedMovieData: data, error };
}
