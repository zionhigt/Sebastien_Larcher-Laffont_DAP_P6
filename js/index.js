var body = document.querySelector('body');
var dropDownTrigger = document.getElementById("dropCategoryTrigger");

var categoriesListContainer = document.getElementById("categoriesList");
var categoriesList = categoriesListContainer.querySelector('ul');
var categories = ["Action", "Adult", "Animation", "Comedie", "Horreur"]

var buildFlag = function(flag_name) {
    flagElement = document.createElement('div');
    flagElement.classList.add("flag");
    flagElement.innerHTML = flag_name;
    return flagElement;
}

var buildModal = function(movieData, id) {
    var modalTemplate = document.getElementById('modalTemplate');
    var cloneModal = document.importNode(modalTemplate.content, true);
    var modalBox = cloneModal.querySelector("#modalBox");
    modalBox.setAttribute('id', id);

    var modalTitle = cloneModal.querySelector('h3');
    modalTitle.innerHTML = movieData.title;

    var modalList = cloneModal.querySelector('ul');
    var directorsText = movieData.directors.join(", ")
    var directorsElement = document.createElement("li");
    directorsElement.innerHTML = "<br/><span>Directeurs: </span><br/>" + directorsText;
    modalList.appendChild(directorsElement);

    var actorsText = movieData.actors.join(", ")
    var actorsElement = document.createElement("li");
    actorsElement.innerHTML = "<br/><span>Acteurs: </span><br/>" + actorsText;
    modalList.appendChild(actorsElement);

    var imdbText = movieData.imdb_score
    var imdbElement = document.createElement("li");
    imdbElement.innerHTML = "<br/><span>imdb: </span>" + imdbText + "<br/><br/>";
    modalList.appendChild(imdbElement);

    var genresElement = document.createElement("li");
    genresElement.classList.add("flags")
    genresElement.innerHTML = "<br/><span>Genres: </span><br/>"
    movieData.genres.forEach(function(genre) {
        flagGenre = buildFlag(genre);
        genresElement.appendChild(flagGenre);

    })
    modalList.appendChild(genresElement);

    var btnClose = cloneModal.querySelector("#closeModal");
    btnClose.setAttribute('id', `closeModal${movieData.id}`)
    btnClose.addEventListener('click', function (event) {
        event.preventDefault();
        body.classList.remove("modal-up");
        modalBox.classList.remove("up");
    });
    var modalImage = cloneModal.querySelector("img");
    modalImage.setAttribute('src', movieData.image_url)
    body.appendChild(modalBox);
    return modalBox;
    
}
var buildSection = function(category) {
    var sectionTemplate = document.querySelector("#categorySection");
    var clone = document.importNode(sectionTemplate.content, true);
    var section = clone.querySelector("section");
    var sectionTitle = clone.querySelector("h2");
    sectionTitle.innerHTML = category.name
    var sectionContainer = clone.querySelector(".container");
    console.log(sectionContainer)
    var figureTemplate = clone.querySelector("#templateFigure");
    for(movieData of category.moviesData.results) {
        var cloneFigure = document.importNode(figureTemplate.content, true);
        var figure = cloneFigure.querySelector('figure');
        var figureTitle = figure.querySelector('h3')
        figureTitle.innerHTML = movieData.title;
        figureImage = figure.querySelector('img');
        figureImage.setAttribute("src", movieData.image_url)
        sectionContainer.appendChild(figure);
        buildModal(movieData, `modalMovie${movieData.id}`)
        figureModalTrigger = figure.querySelector('#modalTrigger');
        figureModalTrigger.setAttribute('id', `modalTrigger${movieData.id}`);
        figureModalTrigger.setAttribute('data-action', `#modalMovie${movieData.id}`);

        figureModalTrigger.addEventListener("click", function(event) {
            event.preventDefault()
            var modalId = event.target.getAttribute('data-action');
            var modalBox = document.querySelector(modalId);
            modalBox.classList.add('up');
            body.classList.add("modal-up");
        });
    }
    // category.moviesData.froEach(function(movie))
    section.setAttribute('id', `section${category.name}`)
    body.appendChild(section);
}


var buildCategories = function(categories) {
    categories.forEach(function (category, self) {
        var listElement = document.createElement("li");
        var listElementLink = document.createElement("a");
        listElement.appendChild(listElementLink);
        listElementLink.innerHTML = category.name;
        listElementLink.setAttribute('href', `#section${category.name}`);
        categoriesList.appendChild(listElement);
        buildSection(category);
    });
}


dropDownTrigger.addEventListener("click", function(event) {
    event.preventDefault();
    var targetId = event.target.getAttribute("for")
    var actionTarget = document.querySelector(`${targetId}`);
    actionTarget.classList.toggle('active')
    console.log(actionTarget)
});

var btnClose = document.getElementById("closeModal");

getFilm()
.then(function(film) {
    console.log(film)
    modalId = "bestRatingMovieModal";
    var bestRatingImage = document.querySelector(".most_popular--image img");
    var bestRatingTitle = document.querySelector(".most_popular--title");

    bestRatingImage.setAttribute('src', film.image_url);
    bestRatingTitle.innerHTML = film.title;

    buildModal(film, modalId)
    modalTrigger = document.getElementById("modalTrigger");
    modalTrigger.addEventListener("click", function(event) {
        event.preventDefault();
        var targetId = event.target.getAttribute("data-action")
        var actionTarget = document.querySelector(`${targetId}`);
        actionTarget.classList.add('up');
        body.classList.add("modal-up");    
    });
    
})


// getBestRatingMovie()
// .then(function(bestMovie) {
//     console.log(bestMovie);
// })
// .catch(function(err) {
//     console.log(err);
// });

getCategories()
.then(function(data) {
    categoryPromises = data.results.map(function(category) {
        return getMoviesByCategory(category.name)
    });
    console.log(categoryPromises)
    Promise.all(categoryPromises)
    .then(function(category) {
        buildCategories(category)
        return category
    })
})
.catch(function(err) {
    console.log(err);
})