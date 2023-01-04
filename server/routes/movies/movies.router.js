const express = require("express");

const {
  httpGetMovieBySearch,
  httpGetMovieByGenre,
  httpGetMovieById,
  httpGetMovieBySimilar,
} = require("./movies.controller");

const moviesRouter = express.Router();
//base url: /movies
moviesRouter.get("/search", httpGetMovieBySearch);
moviesRouter.get("/genres/:genreId", httpGetMovieByGenre);
moviesRouter.get("/:movieId", httpGetMovieById);
moviesRouter.get("/similar/:movieId", httpGetMovieBySimilar);

module.exports = moviesRouter;
