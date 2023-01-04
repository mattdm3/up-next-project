const express = require("express");

const { httpGetMovieBySearch } = require("./movies.controller");

const moviesRouter = express.Router();

moviesRouter.get("/search", httpGetMovieBySearch);

module.exports = moviesRouter;
