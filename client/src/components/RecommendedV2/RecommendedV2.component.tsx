import React, {
  useState,
  lazy,
  Suspense,
  memo,
  useContext,
  useCallback,
  useMemo,
} from "react";
import styled from "styled-components";
import { lightTheme } from "../theme";
// const Select = lazy(() =>
//   import("antd").then(({ Select }) => ({ default: Select }))
// );
import { Select } from "antd";
import { LoginContext } from "../LoginContext";
import { useGetLikedMovies } from "../../hooks/useGetLikedMovies";
import { FaCheck } from "react-icons/fa";
import { SERVER_URL } from "../../request";
const OPTIONS = ["Apples", "Nails", "Bananas", "Helicopters"];
const MAX_MOVIES = 5;
// const MemoizedSelect = memo(Select);

const RecommendedV2 = () => {
  const { dataObject } = useContext(LoginContext);
  const [recommended, setRecommended] = useState(null);
  const [selectedTitles, setSelectedTitles] = useState<string[]>([]);
  const { likedMovieData } = useGetLikedMovies({
    likedMovieListById: dataObject?.liked,
  });
  console.log({ liked: dataObject?.liked });
  const handleSelectOnChange = useCallback((item) => {
    if (item.length >= MAX_MOVIES) return;
    setSelectedTitles(item);
  }, []);
  const getRecommendations = useCallback(async () => {
    const response = await fetch(`${SERVER_URL}/ai`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        selectedTitles: selectedTitles.join(", "),
      }),
    });
    console.log({ response });
    const json = await response.json();
    setRecommended(json);
    console.log({ json });
  }, [selectedTitles]);

  const selectedMovies = useMemo(() => {
    if (!selectedTitles?.length) return [];
    const filteredMovies = likedMovieData.filter((movie) => {
      let match = false;
      for (let i = 0; i < selectedTitles.length; i++) {
        if (movie.title === selectedTitles[i]) {
          match = true;
          break;
        }
      }
      return match;
    });
    return [...new Set(filteredMovies)];
  }, [likedMovieData, selectedTitles]);

  console.log({ selectedMovies });

  return (
    <div>
      <h3 className="my-6">Choose up to 4 movies to get a recommendation.</h3>
      <div className=" w-2/4">
        <div className="flex items-center gap-3">
          <Select
            mode="multiple"
            placeholder="Select up to 4 movies you like."
            value={selectedTitles}
            onChange={handleSelectOnChange}
            className="cursor-pointer"
            style={{ width: "100%" }}
            options={likedMovieData.map((item) => ({
              value: item.title,
              label: item.title,
            }))}
          />
          {selectedTitles?.length >= 3 && <FaCheck color="green}" />}
        </div>
      </div>
      <div className="flex w-full justify-between items-center  mt-4">
        {selectedTitles?.length >= 3 && (
          <GetBtn onClick={getRecommendations}>Get Recommendation</GetBtn>
        )}
        {recommended && JSON.stringify(recommended, null, 0)}
        {/* <div className="flex w-full flex-wrap justify-end gap-2">
          {selectedMovies?.map((movie) => {
            return (
              <div className="w-40" key={movie.title}>
                <img
                  alt={movie.title + " image"}
                  src={`https://image.tmdb.org/t/p/w500/${movie?.poster_path}`}
                />
              </div>
            );
          })}
        </div> */}
      </div>
    </div>
  );
};

const GetBtn = styled.button`
  background: ${({ theme }) => (theme === lightTheme ? "#F65F2D" : "#F65F2D")};
  color: ${({ theme }) => (theme === lightTheme ? "#FFFFFF" : "#1F209A")};
  border-radius: 10px;
  margin-bottom: 2rem;
  padding: 1rem 1.5rem;
  font-size: 1.1rem;
  text-transform: uppercase;
  font-weight: 600;
  border: none;
  width: 17rem;
  cursor: pointer;
  box-shadow: ${({ theme }) =>
    theme === lightTheme
      ? "0px 0px 15px -5px rgba(35,36,118,1)"
      : "0px 0px 15px -5px rgba(100,100,100,1)"};
`;

export default RecommendedV2;
