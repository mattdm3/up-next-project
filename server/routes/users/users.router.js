const express = require("express");
const {
  httpGetUser,
  httpDislikeMovie,
  httpLikeMovie,
  httpAddUpNextMovie,
  httpUndoRatingMovie,
} = require("./users.controller");

const usersRouter = express.Router();

usersRouter.post("/", httpGetUser);
usersRouter.post("/dislike", httpDislikeMovie);
usersRouter.post("/like", httpLikeMovie);
usersRouter.post("/upNext", httpAddUpNextMovie);
usersRouter.post("/undoRating", httpUndoRatingMovie);

module.exports = usersRouter;
