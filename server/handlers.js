const fetch = require('isomorphic-fetch');


const handleRandomMovie = async (req, res) => {

    //pick a random number, and search by ID
    let randomNum = Math.floor(Math.random() * 690000);

    var options = {
        method: 'GET',
        url: `https://api.themoviedb.org/3/movie/${randomNum}`,
        headers: {
            authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI5ZDA5Nzc1ZGIxMGQwMzg3ZGY5YWEwNDYzNjZiNzE3MiIsInN1YiI6IjVlYTFlODY5YWY0MzI0MDAxZDllN2Q0MSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.OxkyvbtGbap8tCc1NN3pATUNlPSNqhOGKcWk8uCvOSc'
        }
    };

    const response = await fetch(options.url, {
        method: options.method,
        headers: options.headers,
    })


    const json = await response.json();
    // console.log(json)
    return res.send(json);

}



const handleSearch = async (req, res) => {
    //do something
}

const handleGenreId = async (req, res) => {
    // // do something


    console.log(req.params)

    const { genreId } = req.params;
    console.log(req.params)

    var options = {
        method: 'GET',
        url: `https://api.themoviedb.org/3/discover/movie?with_genres=${genreId}&original_language=en&sort_by=popularity.desc&vote_count.gte=10`,
        headers: {
            authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI5ZDA5Nzc1ZGIxMGQwMzg3ZGY5YWEwNDYzNjZiNzE3MiIsInN1YiI6IjVlYTFlODY5YWY0MzI0MDAxZDllN2Q0MSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.OxkyvbtGbap8tCc1NN3pATUNlPSNqhOGKcWk8uCvOSc'
        }
    };

    const response = await fetch(options.url, {
        method: options.method,
        headers: options.headers,
    })


    const json = await response.json();
    // console.log(json)
    return res.send(json);
}

const handleMovieId = async (req, res) => {
    // do something
}


module.exports = {
    handleRandomMovie, handleSearch, handleGenreId, handleMovieId
};