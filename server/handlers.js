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
    const { searchTerm } = req.params;
    console.log(req.params)

    var options = {
        method: 'GET',
        url: `https://api.themoviedb.org/3/search/movie?query=${searchTerm}`,
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

const handleProfilePage = async (req, res) => {
    // do something
}

const handleGenreId = async (req, res) => {
    // // do something

    //get query for sort. 

    console.log(req.params)
    console.log(req.query)

    const { genreId } = req.params;
    const { sort } = req.query;
    const { browsePage } = req.query;

    var options = {
        method: 'GET',
        url: `https://api.themoviedb.org/3/discover/movie?include_adult=false&with_genres=${genreId}&original_language=en&sort_by=${sort}.desc&vote_count.gte=10&page=${browsePage}`,
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

//End: /movies/:movieId
const handleMovieId = async (req, res) => {

    const movieId = req.params.movieId.toString();

    try {
        var options = {
            method: 'GET',
            url: `https://api.themoviedb.org/3/movie/${movieId}?append_to_response=credits,videos`,
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


    } catch (error) {
        console.log("error at handleMovieId", error.message)

    }

}


module.exports = {
    handleProfilePage, handleRandomMovie, handleSearch, handleGenreId, handleMovieId
};