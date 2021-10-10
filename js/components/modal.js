var buildModal = function (movieData, id) {
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
    movieData.genres.forEach(function (genre) {
        flagGenre = buildFlag(genre);
        genresElement.appendChild(flagGenre);

    })
    modalList.appendChild(genresElement);

    var btnClose = cloneModal.querySelector("#closeModal");
    btnClose.setAttribute('id', `closeModal${movieData.id}`)
    btnCloseTrigger(btnClose, modalBox);
    
    var modalImage = cloneModal.querySelector("img");
    modalImage.setAttribute('src', movieData.image_url)
    document.body.appendChild(modalBox);
    return modalBox;

}