var get = async function(url) {
    var request = await fetch(url);
    return await request.json();
}
var getCategories = async function() {
   return await get("http://localhost:8000/api/v1/genres");
}

var getMoviesByCategory = async function(category) {
    var objectCategory = {
        name: category,
        moviesData: await get(`http://localhost:8000/api/v1/titles/?genre=${category}`)
    }
    return objectCategory;
}

var getBestRatingMovie = async function() {
    return await get("http://localhost:8000/api/v1/titles/?sort_by=imdb_score");
}

var getFilm = async function() {
    films = await get("http://localhost:8000/api/v1/titles/?sort_by=imdb_score");
    return films.results[1];
}