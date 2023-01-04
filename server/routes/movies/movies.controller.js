const HEADERS = {
  authorization: `Bearer ${process.env.MOVIE_DB_BEARER}`,
};

async function httpGetMovieBySearch(req, res) {
  const { searchTerm } = req.query;
  const options = {
    method: "GET",
    url: `https://api.themoviedb.org/3/search/movie?query=${searchTerm}`,
    headers: HEADERS,
  };
  const response = await fetch(options.url, {
    method: options.method,
    headers: options.headers,
  });
  const json = await response.json();
  return res.status(200).json(json);
}

async function httpGetMovieByGenre(req, res) {
  const { genreId } = req.params;
  const { sort } = req.query;
  const { browsePage } = req.query;

  var options = {
    method: "GET",
    url: `https://api.themoviedb.org/3/discover/movie?include_adult=false&with_genres=${genreId}&with_original_language=en&sort_by=${sort}.desc&vote_count.gte=10&page=${browsePage}`,
    headers: HEADERS,
  };
  const response = await fetch(options.url, {
    method: options.method,
    headers: options.headers,
  });
  const json = await response.json();
  return res.status(200).json(json);
}

async function httpGetMovieById(req, res) {
  const movieId = req.params.movieId.toString();

  try {
    var options = {
      method: "GET",
      url: `https://api.themoviedb.org/3/movie/${movieId}?append_to_response=credits,videos`,
      headers: HEADERS,
    };
    const response = await fetch(options.url, {
      method: options.method,
      headers: options.headers,
    });
    const json = await response.json();
    return res.status(200).json(json);
  } catch (error) {
    console.log("error getting movie", error.message);
    res.status(400).json({ error: "error getting movie" });
  }
}

async function httpGetMovieBySimilar(req, res) {
  const movieId = req.params.movieId.toString();

  try {
    var options = {
      method: "GET",
      url: `https://api.themoviedb.org/3/movie/${movieId}/recommendations?language=en-US&page=1`,
      headers: HEADERS,
    };
    const response = await fetch(options.url, {
      method: options.method,
      headers: options.headers,
    });
    const json = await response.json();
    return res.status(200).json(json);
  } catch (error) {
    console.log("error at get similar movies", error.message);
    res.status(400).json({ error: "error gettings similar movie" });
  }
}

module.exports = {
  httpGetMovieBySearch,
  httpGetMovieByGenre,
  httpGetMovieById,
  httpGetMovieBySimilar,
};
