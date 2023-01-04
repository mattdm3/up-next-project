async function httpGetMovieBySearch(req, res) {
  const { searchTerm } = req.query;
  const options = {
    method: "GET",
    url: `https://api.themoviedb.org/3/search/movie?query=${searchTerm}`,
    headers: {
      authorization: `Bearer ${process.env.MOVIE_DB_BEARER}`,
    },
  };
  const response = await fetch(options.url, {
    method: options.method,
    headers: options.headers,
  });
  const json = await response.json();
  return res.status(200).json(json);
}

module.exports = {
  httpGetMovieBySearch,
};
