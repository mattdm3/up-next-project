// import fs from 'fs';
// import csv from 'fast-csv';

const express = require('express');
const bodyParser = require("body-parser");
const morgan = require('morgan');
const { handleRandomMovie, handleSearch, handleMovieId, handleGenreId, handleProfilePage } = require('./handlers')
const { handleAddUpNext, handleLikeMovie, handleDislikeMovie, createUser, getUser } = require('./firebaseHandlers');
const { handleRecommendations } = require('./src/shorterRecommend')

require('dotenv').config();

const PORT = 4000;


var app = express()
app.use(function (req, res, next) {
    res.header(
        'Access-Control-Allow-Methods',
        'OPTIONS, HEAD, GET, PUT, POST, DELETE'
    );
    res.header(
        'Access-Control-Allow-Headers',
        'Origin, X-Requested-With, Content-Type, Accept'
    );
    next();
})

app.use(morgan('tiny'))
app.use(bodyParser.json())
app.use(express.urlencoded({
    extended: false
}))
app.use('/', express.static(__dirname + '/'))


// ENDPOINTS 

app.get("/randomMovie", handleRandomMovie);
app.get('/search/searchResults', handleSearch)
app.get('/genres/:genreId', handleGenreId)
app.get('/movies/:movieId', handleMovieId)
app.get('/profile/:userId', handleProfilePage)

//INITIAL RECOMMENDATION CALCULATION handled in shorterRecommend.js
app.post('/recommendations/get', handleRecommendations)


//user EPs (firebase)
app.post('/users', createUser)
app.post('/handleDislikeMovie', handleDislikeMovie)

// app.post('/updateUserData', handleUpdateUser)
app.post('/handleLikeMovie', handleLikeMovie)
app.post('/handleAddUpNext', handleAddUpNext)

app.listen(PORT, () => console.info(`🤖LISTENING ON PORT ${PORT}`));