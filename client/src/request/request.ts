export const getUser = () => {};

export const getSearchResult = async (inputValue) => {
  return await fetch(`/movies/search?searchTerm=${inputValue}`).then((res) =>
    res.json()
  );
};
