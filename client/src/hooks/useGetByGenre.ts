import { useEffect, useState } from "react";
import useSwr from "swr";
import { serverUrl } from "../components/LoginContext";
import { request } from "../request";

export function useGetByGenre({ selectedGenreId, sortOption, browsePage }) {
  const key = `${serverUrl}/movies/genres/${selectedGenreId}?sort=${sortOption}&browsePage=${browsePage}`;
  const { data, error } = useSwr(selectedGenreId ? key : null, request);
  return { genreData: data, error };
}
