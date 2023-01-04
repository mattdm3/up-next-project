// https://www.kaggle.com/rounakbanik/the-movies-dataset/data
// Exercise: Content-based - Include credits data with crew and cast too
// Exercise: Content-based - Make features weighted based on popularity or actors
// Exercise: Collaborative Filtering - Model-based CF with SVD

// import fs from 'fs';
// import csv from 'fast-csv';

// import prepareRatings from './preparation/ratings';
// import prepareMovies from './preparation/movies';
// import predictWithLinearRegression from './strategies/linearRegression';
// import predictWithContentBased from './strategies/contentBased';
// import { predictWithCfUserBased, predictWithCfItemBased } from './strategies/collaborativeFiltering';
// import { getMovieIndexByTitle } from './strategies/common';

const fs = require("file-system");
const csv = require("fast-csv");
const { prepareRatings } = require("./preparation/ratings");
const { prepareMovies } = require("./preparation/movies");
const {
  predictWithLinearRegression,
} = require("./strategies/linearRegression");
// const { predictWithContentBased } = require('./strategies/contentBased');
// const { predictWithCfUserBased, predictWithCfItemBased } = require('./strategies/collaborativeFiltering');
const {
  predictWithCfUserBased,
} = require("./strategies/collaborativeFiltering");
const { getMovieIndexByTitle } = require("./strategies/common");
const admin = require("firebase-admin");
require("dotenv").config();
const fetch = require("isomorphic-fetch");
const { MOVIES_BY_ID } = require("../newdata/MOVIES_BY_ID");
const { MOVIES_IN_LIST } = require("../newdata/MOVIES_IN_LIST");
const { X } = require("../newdata/X");

// ZIPPING FILES TEST

// const zlib = require('zlib')
// const unzip1 = zlib.createGunzip();
// const unzip2 = zlib.createGunzip();
// const unzip3 = zlib.createGunzip();

// let MOVIES_BY_ID_DATA;
// let MOVIES_IN_LIST_DATA;
// let X_DATA;

// const byIdContents = fs.createReadStream('./newdata/MOVIES_BY_ID.js.gz');
// MOVIES_BY_ID_DATA = fs.createWriteStream('./newdata/MOVIES_BY_ID.JS')

// const listContents = fs.createReadStream('./newdata/MOVIES_IN_LIST.js.gz');
// MOVIES_IN_LIST_DATA = fs.createWriteStream('./newdata/MOVIES_IN_LIST.JS')

// const XContents = fs.createReadStream('./newdata/X.js.gz');
// X_DATA = fs.createWriteStream('./newdata/X.JS')

// byIdContents.pipe(unzip1).pipe(MOVIES_BY_ID_DATA)
// listContents.pipe(unzip2).pipe(MOVIES_IN_LIST_DATA)
// XContents.pipe(unzip3).pipe(X_DATA)

// let TEST = [];

const unzipFiles = async () => {
  // await byIdContents.pipe(unzip1).pipe(MOVIES_BY_ID)
  // await listContents.pipe(unzip2).pipe(MOVIES_IN_LIST)
  // await XContents.pipe(unzip3).pipe(X)

  // await fs.readFile('./newdata/X.JS', { encoding: 'utf8' }, function (err, data) {
  //     console.log(data)
  // });

  let readFile = fs.createReadStream("./newdata/MOVIES_IN_LIST.js.gz");

  readFile.on("data", function (chunk) {
    TEST.push(chunk);
  });

  readFile.on("end", function () {
    console.log(typeof TEST);
  });
};

// unzipFiles();

// let MOVIES_BY_ID;

// if (MOVIES_BY_ID_DATA) {
//     MOVIES_BY_ID = require('../newdata/MOVIES_BY_ID')
// }

// if (MOVIES_BY_ID_DATA) {
//     console.log(MOVIES_BY_ID)
// }

//

// TEST

const db = admin.database();
const storage = admin.storage();

// const { MongoClient } = require('mongodb');
// const uri = process.env.REACT_APP_DB_CONNECTION
// const client = new MongoClient(uri, { useUnifiedTopology: true, useNewUrlParser: true });

// client.connect();

// console.log(MOVIES_BY_ID_TEST)
// console.log(MOVIES_BY_ID[100])

const handleAllData = async (req, res) => {
  //get data from MONGO

  try {
    await client.connect();
    const db = client.db("UP-NEXT");
    await db
      .collection("MOVIES_IN_LIST")
      .find()
      .toArray((err, result) => {
        if (result) {
          return console.log(result);
        } else if (err) {
          console.log(err);
        }
      });
  } catch (e) {
    console.log(`error connection: ${e.stack}`);
  }
  //happens when app render
  // res.status(200).send(items)
};

// handleAllData();

// const sendToServer = async (req, res) => {

//     await client.connect();
//     const db = client.db("UP-NEXT");
//     await db.collection("X").insertOne(X, function (err, response) {
//         if (err) {
//             console.log("ERROR!!!");
//             throw err;

//         }
//         else
//             console.log("SUCCESS")

//     });

// }
// sendToServer();

// ATTEMPT W STORAge

// console.log(storage.bucket("up-next-c62cb"))

// listFiles()

// async function listFiles() {
//     // Lists files in the bucket
//     const [files] = await storage.bucket().getFiles();

//     console.log('Files:');
//     files.forEach(file => {
//         console.log(file.name);
//     });
// }

let MOVIES_META_DATA = {};
let MOVIES_KEYWORDS = {};
let RATINGS = [];

let moviesMetaDataPromise = new Promise((resolve) =>
  fs
    .createReadStream("./Recommender/data/movies_metadata_smaller.csv")
    .pipe(csv({ headers: true }))
    .on("data", fromMetaDataFile)
    .on("end", () => resolve(MOVIES_META_DATA))
);

let moviesKeywordsPromise = new Promise((resolve) =>
  fs
    .createReadStream("./Recommender/data/keywords.csv")
    .pipe(csv({ headers: true }))
    .on("data", fromKeywordsFile)
    .on("end", () => resolve(MOVIES_KEYWORDS))
);

let ratingsPromise = new Promise((resolve) =>
  fs
    .createReadStream("./Recommender/data/ratings_small.csv")
    .pipe(csv({ headers: true }))
    .on("data", fromRatingsFile)
    .on("end", () => resolve(RATINGS))
);

function fromMetaDataFile(row) {
  MOVIES_META_DATA[row.id] = {
    id: row.id,
    adult: row.adult,
    budget: row.budget,
    genres: softEval(row.genres, []),
    homepage: row.homepage,
    language: row.original_language,
    title: row.original_title,
    overview: row.overview,
    popularity: row.popularity,
    studio: softEval(row.production_companies, []),
    release: row.release_date,
    revenue: row.revenue,
    runtime: row.runtime,
    voteAverage: row.vote_average,
    voteCount: row.vote_count,
  };
}

function fromKeywordsFile(row) {
  MOVIES_KEYWORDS[row.id] = {
    keywords: softEval(row.keywords, []),
  };
}

function fromRatingsFile(row) {
  RATINGS.push(row);
}

function softEval(string, escape) {
  if (!string) {
    return escape;
  }

  try {
    return eval(string);
  } catch (e) {
    return escape;
  }
}

// NOW ALL HAPPENING ON LOAD INSTEAD OF WHEN USER MAKES REQUEST  - had to remove bcz heroku
// let MOVIES_BY_ID;
// let MOVIES_IN_LIST;
// let X;

// const backgroundPrep = async () => {

//     const preparedMovies = await prepareMovies(MOVIES_META_DATA, MOVIES_KEYWORDS);
//     MOVIES_BY_ID = preparedMovies.MOVIES_BY_ID;
//     MOVIES_IN_LIST = preparedMovies.MOVIES_IN_LIST;
//     X = preparedMovies.X;
// }

// const runPromise = () => {
//     Promise.all([
//         moviesMetaDataPromise,
//         moviesKeywordsPromise,
//         ratingsPromise,
//     ]).then(backgroundPrep);
// }

// HAD TO REMOVE FROM HERE SINCE SERVER ONN HEROKU WAS CRASHING

// Promise.all([
//     moviesMetaDataPromise,
//     moviesKeywordsPromise,
//     ratingsPromise,
// ]).then(backgroundPrep);

// // REDIS BULL TESTING /////

// const redis = require('redis')
// const Bull = require("bull")

// const REDIS_PORT = process.env.PORT || 6379;

// const myFirstQueue = new Bull('my-first-queue');

// //producer

// const asyncJob = async () => {
//     const job = await myFirstQueue.add(Promise.all([
//         moviesMetaDataPromise,
//         moviesKeywordsPromise,
//         ratingsPromise,
//     ]));

//     const response = await myFirstQueue.process(async (job) => {
//         console.log(job)
//     });

// }

// asyncJob()

// //consumer
// myFirstQueue.process(async (job) => {
//     console.log(job)
// });

// // REDIS BULL TESTING - END/////

// let MOVIES_BY_ID;
// let MOVIES_IN_LIST;
// let X;

const prepareMoviesTest = async (req, res) => {
  Promise.all([
    moviesMetaDataPromise,
    moviesKeywordsPromise,
    ratingsPromise,
  ]).then(prep);

  async function prep([moviesMetaData, moviesKeywords, ratings]) {
    const preparedMovies = await prepareMovies(
      MOVIES_META_DATA,
      MOVIES_KEYWORDS
    );
    // MOVIES_BY_ID = await preparedMovies.MOVIES_BY_ID;
    MOVIES_IN_LIST = await preparedMovies.MOVIES_IN_LIST;
    X = await preparedMovies.X;

    // await fs.writeFile('./data/recommend/TEST.json', "HELLOOOOO", err => {
    //     if (err) {
    //         console.error(err)
    //         return
    //     }
    //     else console.log("success")
    // })

    // await fs.writeFileSync('./MOVIES_IN_LIST.json', JSON.stringify(MOVIES_IN_LIST, null, 2), 'utf-8', err => {
    //     if (err) {
    //         console.error(err)
    //         return
    //     }
    //     else console.log('success')
    // });

    // await fs.writeFileSync('./X.json', JSON.stringify(X, null, 2), 'utf-8')

    // await res
    //     .status(200)
    //     .json({
    //         status: 200,
    //         message: "success"
    //     })
  }
};

// prepareMoviesTest()

// console.log(MOVIES_BY_ID["22"], "THIS ONE IS IN THE MOVIES")

const handleRecommendations = async (req, res) => {
  let ME_USER_ID = [req.body.uid];
  const { likedMovies, dislikedMovies } = req.body.data;

  let SEND_TO_DB;

  //create arrays with user movie data
  let likedMoviesArray = Object.keys(likedMovies);
  let dislikedMoviesArray = Object.keys(dislikedMovies);

  console.log(likedMoviesArray, "LIKEDMOVIESARRAY");

  console.log(typeof Number(likedMoviesArray[0]));

  console.log("Unloading data from files ... \n");

  Promise.all([
    moviesMetaDataPromise,
    moviesKeywordsPromise,
    ratingsPromise,
  ]).then(init);

  // init();

  // HAD TO REMOVE DUE TO HEROKU LOSING MEM
  // init([MOVIES_META_DATA, MOVIES_KEYWORDS, RATINGS])

  // init([MOVIES_BY_ID, MOVIES_IN_LIST, X])

  async function init([moviesMetaData, moviesKeywords, ratings]) {
    /* ------------ */
    //  Preparation //
    /* -------------*/

    // // ORIGINAL:
    // const {
    //     MOVIES_BY_ID,
    //     MOVIES_IN_LIST,
    //     X,
    // } = await prepareMovies(moviesMetaData, moviesKeywords);

    // USER FILTERED LIKES and DISLIKES

    let filteredLikedMoviesArray = [];
    let filteredDislikedMoviesArray = [];

    await likedMoviesArray.forEach((likedMovieId) => {
      if (MOVIES_BY_ID[likedMovieId] != undefined) {
        filteredLikedMoviesArray.push(likedMovieId);
        console.log(likedMovieId, "TESTING");
      }
    });

    await dislikedMoviesArray.forEach((dislikedMovieId) => {
      if (MOVIES_BY_ID[Number(dislikedMovieId)] != undefined) {
        filteredDislikedMoviesArray.push(Number(dislikedMovieId));
        console.log(dislikedMovieId, "THIS WAS GOOD DISLIKED");
      }
    });

    //GOING TO BE ANAYLYZED
    let ME_USER_RATINGS = [];

    const createUserRatings = async () => {
      await filteredLikedMoviesArray.forEach((item) => {
        ME_USER_RATINGS.push(
          addUserRating(ME_USER_ID, item.toString(), "5.0", MOVIES_IN_LIST)
        );
      });

      await filteredDislikedMoviesArray.forEach((item) => {
        // console.log(typeof item, "CHECKING FILTERED DISLIKED")
        ME_USER_RATINGS.push(
          addUserRating(ME_USER_ID, item.toString(), "1.0", MOVIES_IN_LIST)
        );
      });
    };

    await createUserRatings();

    //checkID here before sending.

    // let ME_USER_RATINGS = [
    //     addUserRating(ME_USER_ID, '120', '5.0', MOVIES_IN_LIST),
    //     addUserRating(ME_USER_ID, '46691', '4.0', MOVIES_IN_LIST),
    //     addUserRating(ME_USER_ID, '920', '3.0', MOVIES_IN_LIST),
    //     addUserRating(ME_USER_ID, '300', '4.0', MOVIES_IN_LIST),
    //     // addUserRating(ME_USER_ID, '522627', '4.0', MOVIES_IN_LIST),
    //     // addUserRating(ME_USER_ID, 'Reservoir Dogs', '3.0', MOVIES_IN_LIST),
    //     // addUserRating(ME_USER_ID, 'Men in Black II', '3.0', MOVIES_IN_LIST),
    //     // addUserRating(ME_USER_ID, 'Bad Boys II', '5.0', MOVIES_IN_LIST),
    //     // addUserRating(ME_USER_ID, 'Sissi', '1.0', MOVIES_IN_LIST),
    //     // addUserRating(ME_USER_ID, 'Titanic', '1.0', MOVIES_IN_LIST),
    // ];

    const { ratingsGroupedByUser, ratingsGroupedByMovie } =
      await prepareRatings([...ME_USER_RATINGS, ...ratings]);

    // console.log(ratings, "ratings")
    // THIS IS THE PROBLEM  - IT"S EMPTY?!
    console.log(ME_USER_RATINGS, "ME _ USER _RATINGS");

    /* ----------------------------- */
    //  Linear Regression Prediction //
    //        Gradient Descent       //
    /* ----------------------------- */

    console.log("\n");
    console.log("(A) Linear Regression Prediction ... \n");

    console.log("(1) Training \n");
    const meUserRatings = await ratingsGroupedByUser[ME_USER_ID];

    // console.log(meUserRatings, "MEUSERRATINGS")
    // console.log(ME_USER_ID, "ME USER ID")
    // console.log(ratingsGroupedByUser, "RATINGS GROUPED BY USER")

    const linearRegressionBasedRecommendation = predictWithLinearRegression(
      X,
      MOVIES_IN_LIST,
      meUserRatings
    );

    console.log("(2) Prediction \n");
    console.log(
      sliceAndDice(linearRegressionBasedRecommendation, MOVIES_BY_ID, 10, true)
    );

    SEND_TO_DB = await sliceAndDice(
      linearRegressionBasedRecommendation,
      MOVIES_BY_ID,
      10,
      true
    );

    // -----------------_*********_-----------------_**********------

    // THIS WAS MY FIRST ONE - will now move to linear regression prediction since it seems smarter.

    // console.log('\n');
    // console.log('(C) Collaborative-Filtering (User-Based) Prediction ... \n');

    // console.log('(1) Computing User-Based Cosine Similarity \n');

    // const cfUserBasedRecommendation = await predictWithCfUserBased(
    //     ratingsGroupedByUser,
    //     ratingsGroupedByMovie,
    //     ME_USER_ID
    // );

    // console.log('(2) Prediction \n');
    // console.log(sliceAndDice(cfUserBasedRecommendation, MOVIES_BY_ID, 20, true));

    // SEND_TO_DB = await sliceAndDice(cfUserBasedRecommendation, MOVIES_BY_ID, 20, true);

    // -----------------_*********_-----------------_**********------

    let recommendedResponse = [];

    //FIRST, we empty the current recomendations data.
    await db
      .ref("appUsers/" + ME_USER_ID)
      .child("data")
      .child("recommendations")
      .set(null);

    // SECOND: get a recommendation count

    let recAmount;
    await db
      .ref("appUsers/" + ME_USER_ID)
      .child("data")
      .child("recommendationCount")
      .once("value")
      .then(function (snapshop) {
        recAmount = snapshop.val();
      });

    // Third: set rec ammount

    await db
      .ref("appUsers/" + ME_USER_ID)
      .child("data")
      .child("recommendationCount")
      .set(recAmount + 1);

    SEND_TO_DB.map(async (movie) => {
      await db
        .ref("appUsers/" + ME_USER_ID)
        .child("data")
        .child("recommendations")
        .child(movie.id)
        .set(movie.id);

      var options = {
        method: "GET",
        url: `https://api.themoviedb.org/3/movie/${movie.id}`,
        headers: {
          authorization:
            "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI5ZDA5Nzc1ZGIxMGQwMzg3ZGY5YWEwNDYzNjZiNzE3MiIsInN1YiI6IjVlYTFlODY5YWY0MzI0MDAxZDllN2Q0MSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.OxkyvbtGbap8tCc1NN3pATUNlPSNqhOGKcWk8uCvOSc",
        },
      };

      let singleResponse = await fetch(options.url, {
        method: options.method,
        headers: options.headers,
      });

      const json = await singleResponse.json();

      recommendedResponse.push(json);

      // console.log(singleResponse, 'SINGLE RESPONSE')

      // console.log(recommendedResponse, "RECOMMENDED BACK END")
    });

    // await console.log(recommendedResponse, "RECOMMENDED RESPONSE ARRAY")

    let snapData;
    await db
      .ref("appUsers/" + ME_USER_ID)
      .once("value")
      .then(function (snapshop) {
        snapData = snapshop.val();
      });
    res.status(200).json({
      status: 200,
      data: snapData,
      message: "recommendations updated",
    });

    return;

    // return res.send({ body: RETURN_TO_USER })
  }

  // Utilities

  function addUserRating(userId, searchTitle, rating, MOVIES_IN_LIST) {
    const { id, title } = getMovieIndexByTitle(MOVIES_IN_LIST, searchTitle);

    return {
      userId,
      rating,
      movieId: id,
      title,
    };
  }

  function sliceAndDice(recommendations, MOVIES_BY_ID, count, onlyTitle) {
    recommendations = recommendations.filter(
      (recommendation) => MOVIES_BY_ID[recommendation.movieId]
    );

    recommendations = onlyTitle
      ? recommendations.map((mr) => ({
          title: MOVIES_BY_ID[mr.movieId].title,
          score: mr.score,
          id: MOVIES_BY_ID[mr.movieId].id,
        }))
      : recommendations.map((mr) => ({
          movie: MOVIES_BY_ID[mr.movieId],
          score: mr.score,
          id: MOVIES_BY_ID[mr.movieId].id,
        }));

    return recommendations.slice(0, count);
  }
};

// // REDIS BULL TESTING /////

// const redis = require('redis')
// const Bull = require("bull")

// const REDIS_PORT = process.env.PORT || 6379;

// const myFirstQueue = new Bull('my-first-queue');

// //producer
// const job = myFirstQueue.add(prepareMovies(moviesMetaData, moviesKeywords));

// //consumer
// myFirstQueue.process(async (job) => {
//     console.log(job)
// });

// // REDIS BULL TESTING - END/////
// setInterval(() => {
//     console.log(process.memoryUsage().heapUsed / 1024 / 1024)
// }, 4000)

module.exports = {
  handleRecommendations,
  prepareMoviesTest,
};
