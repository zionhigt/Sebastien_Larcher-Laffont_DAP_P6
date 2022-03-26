import API from "../api/api.js";
import addCategoryLink from './dropdown.js';
import btnPopTrigger from './btn_pop.js';

const maxItems = 15;

export const buildSection = function (category) {
    addCategoryLink(category.name);
    console.log(category)
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
    const moviesData = category.moviesData.splice(0, maxItems);
    for (let movieData of moviesData) {
        const cloneFigure = document.importNode(figureTemplate.content, true);
        const figure = cloneFigure.querySelector('figure');
        const figureTitle = figure.querySelector('h3')
        figureTitle.innerHTML = movieData.title;
        const figureImage = figure.querySelector('img');
        figureImage.setAttribute("src", API.getImgUrl(movieData.backdrop_path))
        sectionContainer.appendChild(figure);
        const figureModalTrigger = figure.querySelector('.modalTrigger');
        figureModalTrigger.setAttribute('data-action', `#modalMovie${movieData.id}`);
        btnPopTrigger(figureModalTrigger, movieData.id);
    }
    section.setAttribute('id', `section${category.name}`)
    section.removeChild(figureTemplate)
    document.body.appendChild(section);
}
const buildCategories = async function () {
    const categories = await API.getCategories();
    console.log(categories)
    categories.forEach(function (category) {
        buildSection(category);
    });
}
export default buildCategories;

const step = 20;

const scrollCb = function(event, direction=1) {
    event.preventDefault();
    const parent = event.target.parentNode.parentNode.parentNode;
    const scrollableElement = parent.querySelector(".scrollable");
    const containerScrollable = scrollableElement.querySelector(".container");
    let move = containerScrollable.children[0].clientWidth + scrollableElement.scrollLeft;
    scrollableElement.scroll({
        left: move * direction + step,
        behavior: "smooth"
    });
};
/**
 * @Decorator {scrollCb}
 * @param {onclick} event 
 */
const scrollRightCb = function(event) {
    return scrollCb(event);
}

/**
 * @Decorator {scrollCb}
 * @param {onclick} event 
 */
const scrollLeftCb = function (event) {
    scrollCb(event, -1);
}
