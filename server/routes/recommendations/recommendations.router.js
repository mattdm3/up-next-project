const express = require("express");
const { httpGetRecommendations } = require("./recommendations.controller");

const recommendationsRouter = express.Router();

recommendationsRouter.post("/", httpGetRecommendations);

module.exports = recommendationsRouter;
