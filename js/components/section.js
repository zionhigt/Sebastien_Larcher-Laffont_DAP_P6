var buildSection = function (category) {
    var sectionTemplate = document.querySelector("#categorySection");
    var clone = document.importNode(sectionTemplate.content, true);
    var section = clone.querySelector("section");
    var sectionTitle = clone.querySelector("h2");
    sectionTitle.innerHTML = category.name
    var sectionContainer = clone.querySelector(".container");
    var figureTemplate = clone.querySelector("#templateFigure");
    for (movieData of category.moviesData.results) {
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
        btnPopTrigger(figureModalTrigger);
    }
    section.setAttribute('id', `section${category.name}`)
    document.body.appendChild(section);
}