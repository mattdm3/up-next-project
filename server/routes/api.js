const express = require("express");

const recommendationsRouter = require("../routes/recommendations/recommendations.router");
const moviesRouter = require("../routes/movies/movies.router");
const usersRouter = require("../routes/users/users.router");

const api = express.Router();

api.use("/movies", moviesRouter);
api.use("/users", usersRouter);
api.use("/ai", recommendationsRouter);

module.exports = api;
