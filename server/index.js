const path = require("path");
const express = require("express");
const morgan = require("morgan");

const {
  handleAddUpNext,
  handleLikeMovie,
  handleDislikeMovie,
  createUser,
  getUser,
  handleUndoRating,
  handleUpdateUser,
} = require("./firebaseHandlers");
const {
  handleRecommendations,
  prepareMoviesTest,
} = require("./Recommender/shorterRecommend");
const moviesRouter = require("./routes/movies/movies.router");
const usersRouter = require("./routes/users/users.router");
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
app.use("/users", usersRouter);

// OLD RECOMMENDATION ENGINE
//INITIAL RECOMMENDATION CALCULATION handled in shorterRecommend.js
app.post("/recommendations/get", handleRecommendations);
app.get("/recommendations/prepMovies", prepareMoviesTest);

app.get("/*", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "index.html"));
});

app.listen(PORT, () => console.info(`🤖LISTENING ON PORT ${PORT}`));
