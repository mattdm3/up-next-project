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

const fs = require('file-system');
const csv = require('fast-csv');
const { prepareRatings } = require('./preparation/ratings');
const { prepareMovies } = require('./preparation/movies');
// const { predictWithLinearRegression } = require('./strategies/linearRegression');
// const { predictWithContentBased } = require('./strategies/contentBased');
// const { predictWithCfUserBased, predictWithCfItemBased } = require('./strategies/collaborativeFiltering');
const { predictWithCfUserBased } = require('./strategies/collaborativeFiltering');
const { getMovieIndexByTitle } = require('./strategies/common')
const admin = require('firebase-admin');
require('dotenv').config();
const fetch = require('isomorphic-fetch');

const db = admin.database();



let MOVIES_META_DATA = {};
let MOVIES_KEYWORDS = {};
let RATINGS = [];

let moviesMetaDataPromise = new Promise((resolve) =>
    fs
        .createReadStream('./src/data/movies_metadata.csv')
        .pipe(csv({ headers: true }))
        .on('data', fromMetaDataFile)
        .on('end', () => resolve(MOVIES_META_DATA)));

let moviesKeywordsPromise = new Promise((resolve) =>
    fs
        .createReadStream('./src/data/keywords.csv')
        .pipe(csv({ headers: true }))
        .on('data', fromKeywordsFile)
        .on('end', () => resolve(MOVIES_KEYWORDS)));

let ratingsPromise = new Promise((resolve) =>
    fs
        .createReadStream('./src/data/ratings_small.csv')
        .pipe(csv({ headers: true }))
        .on('data', fromRatingsFile)
        .on('end', () => resolve(RATINGS)));

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







const handleRecommendations = async (req, res) => {


    let ME_USER_ID = [req.body.uid];
    const { likedMovies, dislikedMovies } = req.body.data;

    let SEND_TO_DB;

    // console.log(likedMovies);
    // console.log(dislikedMovies, "DISLIKED CACA");

    //create arrays with user movie data
    let likedMoviesArray = Object.keys(likedMovies);
    let dislikedMoviesArray = Object.keys(dislikedMovies)

    console.log('Unloading data from files ... \n');

    Promise.all([
        moviesMetaDataPromise,
        moviesKeywordsPromise,
        ratingsPromise,
    ]).then(init)


    async function init([moviesMetaData, moviesKeywords, ratings]) {
        /* ------------ */
        //  Preparation //
        /* -------------*/

        const {
            MOVIES_BY_ID,
            MOVIES_IN_LIST,
            X,
        } = await prepareMovies(moviesMetaData, moviesKeywords);


        // USER FILTERED LIKES and DISLIKES

        let filteredLikedMoviesArray = [];
        let filteredDislikedMoviesArray = [];

        await likedMoviesArray.forEach((likedMovieId) => {

            if (MOVIES_BY_ID[likedMovieId] != undefined) {
                filteredLikedMoviesArray.push(likedMovieId);
                console.log(likedMovieId, "THIS WAS GOOD");
            };
        })

        await dislikedMoviesArray.forEach((likedMovieId) => {

            if (MOVIES_BY_ID[likedMovieId] != undefined) {
                filteredDislikedMoviesArray.push(likedMovieId);
                console.log(likedMovieId, "THIS WAS CACA");
            };
        })

        //GOING TO BE ANAYLYZED
        let ME_USER_RATINGS = [];

        const createUserRatings = async () => {
            await filteredLikedMoviesArray.forEach(item => {
                ME_USER_RATINGS.push(addUserRating(ME_USER_ID, item, "5.0", MOVIES_IN_LIST))
            })

            await filteredDislikedMoviesArray.forEach(item => {
                console.log(item, "CHECKING FILTERED DISLIKED")
                ME_USER_RATINGS.push(addUserRating(ME_USER_ID, item, "1.0", MOVIES_IN_LIST))
            })

        }


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

        const {
            ratingsGroupedByUser,
            ratingsGroupedByMovie,
        } = await prepareRatings([...ME_USER_RATINGS, ...ratings]);


        console.log('\n');
        console.log('(C) Collaborative-Filtering (User-Based) Prediction ... \n');

        console.log('(1) Computing User-Based Cosine Similarity \n');

        const cfUserBasedRecommendation = await predictWithCfUserBased(
            ratingsGroupedByUser,
            ratingsGroupedByMovie,
            ME_USER_ID
        );

        console.log('(2) Prediction \n');
        console.log(sliceAndDice(cfUserBasedRecommendation, MOVIES_BY_ID, 20, true));

        SEND_TO_DB = await sliceAndDice(cfUserBasedRecommendation, MOVIES_BY_ID, 20, true);

        // MAYBE YOU SHOULD SEND THIS DIRECTLY TO DB FIRST? 

        let recommendedResponse = [];
        SEND_TO_DB.map(async (movie) => {

            await db.ref('appUsers/' + ME_USER_ID)
                .child('data')
                .child('recommendations')
                .child(movie.id)
                .set(movie.id)

            var options = {
                method: 'GET',
                url: `https://api.themoviedb.org/3/movie/${movie.id}`,
                headers: {
                    authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI5ZDA5Nzc1ZGIxMGQwMzg3ZGY5YWEwNDYzNjZiNzE3MiIsInN1YiI6IjVlYTFlODY5YWY0MzI0MDAxZDllN2Q0MSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.OxkyvbtGbap8tCc1NN3pATUNlPSNqhOGKcWk8uCvOSc'
                }
            };

            let singleResponse = await fetch(options.url, {
                method: options.method,
                headers: options.headers,
            })

            const json = await singleResponse.json()


            recommendedResponse.push(json)

            // console.log(singleResponse, 'SINGLE RESPONSE')

            // console.log(recommendedResponse, "RECOMMENDED BACK END")


        })

        // await console.log(recommendedResponse, "RECOMMENDED RESPONSE ARRAY")

        let snapData;
        await db.ref('appUsers/' + ME_USER_ID)
            .once('value')
            .then(function (snapshop) {
                snapData = snapshop.val();
            })
        res
            .status(200)
            .json({
                status: 200,
                data: snapData,
                message: "recommendations updated"
            })

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
        recommendations = recommendations.filter(recommendation => MOVIES_BY_ID[recommendation.movieId]);

        recommendations = onlyTitle
            ? recommendations.map(mr => ({ title: MOVIES_BY_ID[mr.movieId].title, score: mr.score, id: MOVIES_BY_ID[mr.movieId].id }))
            : recommendations.map(mr => ({ movie: MOVIES_BY_ID[mr.movieId], score: mr.score, id: MOVIES_BY_ID[mr.movieId].id }));

        return recommendations
            .slice(0, count);
    }


}


module.exports = {
    handleRecommendations
}