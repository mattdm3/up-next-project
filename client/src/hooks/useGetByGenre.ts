import useSwr from "swr";
import { request, SERVER_URL } from "../request";

export function useGetByGenre({ selectedGenreId, sortOption, browsePage }) {
  const key = `${SERVER_URL}/movies/genres/${selectedGenreId}?sort=${sortOption}&browsePage=${browsePage}`;
  const { data, error } = useSwr(selectedGenreId ? key : null, request);
  return { genreData: data, error };
}
