const maxItems = 7;

const buildSection = function (category) {
    addCategoryLink(category.name);
    const sectionTemplate = document.querySelector("#categorySection");
    const clone = document.importNode(sectionTemplate.content, true);
    const section = clone.querySelector("section");
    const sectionTitle = clone.querySelector("h2");
    sectionTitle.innerHTML = category.name
    const sectionContainer = clone.querySelector(".container");

    const scrollRight = clone.querySelector('.scroll-arrow-right');
    scrollRight.addEventListener("click", scrollRightCb);

    const scrollLeft = clone.querySelector('.scroll-arrow-left');
    scrollLeft.addEventListener("click", scrollLeftCb);

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
const scrollRightCb = function(event) {
    event.preventDefault();
    const parent = event.target.parentNode.parentNode.parentNode;
    const scrollableElement = parent.querySelector(".scrollable");
    const containerScrollable = scrollableElement.querySelector(".container");
    const otherArrow = parent.querySelector('.scroll-arrow-left');
    let move = containerScrollable.children[0].clientWidth + scrollableElement.scrollLeft + 20;
    let percentScroll = scrollableElement.scrollLeft / containerScrollable.children[0].clientWidth;
    scrollableElement.scroll({
        left: move,
        behavior: "smooth"
    });
}

const scrollLeftCb = function (event) {
    event.preventDefault();
    const parent = event.target.parentNode.parentNode.parentNode;
    const scrollableElement = parent.querySelector(".scrollable");
    const containerScrollable = scrollableElement.querySelector(".container");
    const otherArrow = parent.querySelector('.scroll-arrow-right');
    let move = scrollableElement.scrollLeft - containerScrollable.children[0].clientWidth + 20;
    let percentScroll = scrollableElement.scrollLeft / (containerScrollable.clientWidth - scrollableElement.clientWidth) * 100;
    console.log(percentScroll)
    if (percentScroll < 300) {
        otherArrow.classList.add('active');
    }
    if (percentScroll < 60) {
        event.target.parentNode.classList.remove("active");
        move = 0;
    }
    scrollableElement.scroll({
        left: move,
        behavior: "smooth"
    });
}
