const fetch = require("isomorphic-fetch");
const MOVIE_DB_BEARER = process.env.MOVIE_DB_BEARER;

const handleRandomMovie = async (req, res) => {
  //pick a random number, and search by ID
  let randomNum = Math.floor(Math.random() * 690000);

  var options = {
    method: "GET",
    url: `https://api.themoviedb.org/3/movie/${randomNum}`,
    headers: {
      authorization: `Bearer ${MOVIE_DB_BEARER}`,
    },
  };

  const response = await fetch(options.url, {
    method: options.method,
    headers: options.headers,
  });

  const json = await response.json();

  return res.send(json);
};

module.exports = {
  handleRandomMovie,
};
