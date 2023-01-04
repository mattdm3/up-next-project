const path = require("path");
const express = require("express");
const morgan = require("morgan");
const {
  handleRandomMovie,
  handleMovieId,
  handleGenreId,
  getSimilarMovies,
} = require("./handlers");
const {
  handleAddUpNext,
  handleLikeMovie,
  handleDislikeMovie,
  createUser,
  getUser,
  handleUndoRating,
} = require("./firebaseHandlers");
const {
  handleRecommendations,
  prepareMoviesTest,
} = require("./Recommender/shorterRecommend");
const moviesRouter = require("./routes/movies.router");
require("dotenv").config();

const PORT = process.env.PORT || 4000;

var app = express();

const cors = require("cors");
app.use(cors());

// app.use(function (req, res, next) {
//   res.header(
//     "Access-Control-Allow-Methods",
//     "OPTIONS, HEAD, GET, PUT, POST, DELETE"
//   );
//   res.header(
//     "Access-Control-Allow-Headers",
//     "Origin, X-Requested-With, Content-Type, Accept"
//   );
//   next();
// });

app.use(morgan("tiny"));
app.use(express.json());
app.use(express.static(path.join(__dirname, "public")));

// NEW ENDPOITNS w ROUTER

app.use("/movies", moviesRouter);

// ENDPOINTS
app.get("/randomMovie", handleRandomMovie); // not used in FE
// app.get("/search/:searchTerm", handleSearch); depracated
app.get("/genres/:genreId", handleGenreId);
app.get("/movies/:movieId", handleMovieId);
app.get("/movies/getSimilar/:movieId", getSimilarMovies);

//INITIAL RECOMMENDATION CALCULATION handled in shorterRecommend.js
app.post("/recommendations/get", handleRecommendations);

// PREP MOVIES TEST
app.get("/recommendations/prepMovies", prepareMoviesTest);

//user EPs (firebase)
app.post("/users", createUser);
app.post("/handleDislikeMovie", handleDislikeMovie);

// app.post('/updateUserData', handleUpdateUser)
app.post("/handleLikeMovie", handleLikeMovie);
app.post("/handleAddUpNext", handleAddUpNext);
app.post("/handleUndoRating", handleUndoRating);

app.get("/*", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "index.html"));
});

app.listen(PORT, () => console.info(`🤖LISTENING ON PORT ${PORT}`));
