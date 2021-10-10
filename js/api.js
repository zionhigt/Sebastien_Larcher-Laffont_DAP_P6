var get = async function(url, ) {
    var request = await fetch(url);
    return await request.json();
    
}
var getColection = async function(url, count) {
    var colection = {
        count: count,
        next: null,
        previous: null,
        results: new Array()
    }
    do {
        var films = await get(url);
        if (films.count == 0) {
            return films;
        } else {
            colection.results = colection.results.concat(films.results);
            if (films.next) {
                url = films.next;
            }
        }
    }
    while (colection.results.length < count - 1);
    colection.count = colection.results.length;
    return colection;
}
var getCategories = async function(count=10) {
    return await getColection("http://192.168.1.113:8000/api/v1/genres/", count);
}

var getMoviesByCategory = async function(category, min=7) {
    var objectCategory = {
        name: category,
        moviesData: await getColection(`http://192.168.1.113:8000/api/v1/titles/?genre=${category}&sort_by=-imdb_score`, min)
    }
    console.count("")
    return objectCategory;
}

var getBestRatingMovie = async function() {
    films = await get(`http://192.168.1.113:8000/api/v1/titles/?sort_by=-imdb_score,-votes`);
    return films.results[0];
}

var getBestRatingCategory = async function () {
    var films = await getColection(`http://192.168.1.113:8000/api/v1/titles/?sort_by=-imdb_score,-votes`, 7);
    return films;
}