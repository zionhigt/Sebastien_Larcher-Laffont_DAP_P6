const maxItems = 7;

const buildSection = function (category) {
    addCategoryLink(category.name);
    const sectionTemplate = document.querySelector("#categorySection");
    const clone = document.importNode(sectionTemplate.content, true);
    const section = clone.querySelector("section");
    const sectionTitle = clone.querySelector("h2");
    sectionTitle.innerHTML = category.name
    const sectionContainer = clone.querySelector(".container");
    const figureTemplate = clone.querySelector("#templateFigure");
    for (movieData of category.moviesData.splice(0, maxItems)) {
        const cloneFigure = document.importNode(figureTemplate.content, true);
        const figure = cloneFigure.querySelector('figure');
        const figureTitle = figure.querySelector('h3')
        figureTitle.innerHTML = movieData.title;
        figureImage = figure.querySelector('img');
        figureImage.setAttribute("src", movieData.image_url)
        sectionContainer.appendChild(figure);
        figureModalTrigger = figure.querySelector('.modalTrigger');
        figureModalTrigger.setAttribute('data-action', `#modalMovie${movieData.id}`);
        btnPopTrigger(figureModalTrigger, movieData.id);
    }
    section.setAttribute('id', `section${category.name}`)
    section.removeChild(figureTemplate)
    document.body.appendChild(section);
}

const buildCategories = function (categories) {
    categories.forEach(function (category) {
        buildSection(category);
    });
}

