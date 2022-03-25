const host = "192.168.1.113";
const port = "8000";
const origin = `http://${host}:${port}/api/v1`

const getURL = function(params) {
    return origin + params;
}
const get = async function (url) {
    const request = await fetch(url);
    return await request.json();
    
}
const getColection = async function(url, count) {
    const colection = {
        count: count,
        next: null,
        previous: null,
        results: new Array()
    }
    do {
        const films = await get(url);
        if (films.count == 0) {
            return films;
        } else {
            colection.results = colection.results.concat(films.results);
            if (films.next) {
                url = films.next
            }
        }
    }
    while (colection.results.length < count - 1);
    colection.count = colection.results.length;
    return colection;
}

const getCategories = async function(count=10) {
    const categories = await getColection(getURL("/genres/"), count);
    return categories;
}

const getMoviesByCategory = async function(category, min=7) {
    const films_colection = await getColection(getURL(`/titles/?genre=${category}&sort_by=-imdb_score`), min);
    const objectCategory = {
        name: category,
        moviesData: films_colection.results
    }
    return objectCategory;
}

const getBestRatingMovie = async function() {
    films = await get(getURL(`/titles/?sort_by=-imdb_score,-votes`));
    return await get(films.results[0].url);
}

const getBestRatingCategory = async function () {
    const films = await getColection(getURL(`/titles/?sort_by=-imdb_score,-votes`), 7);
    films.results = films.results;
    return films;
}