import API from "../api/api.js"
import btnPopTrigger from "../components/btn_pop.js";
import { buildSection } from "./section.js";

export default async function() {
    const films = await API.getTopTrending()
    const film = films.results[0]
    console.log(films)
    films.results.shift();
    buildSection({name: "Top tendances", moviesData: films.results})
    console.log(films)
    const modalId = `modalMovie${film.id}`;
    const bestRatingImage = document.querySelector(".most_popular--image img");
    bestRatingImage.setAttribute('src', API.getImgUrl(film.backdrop_path));

    const bestRatingTitle = document.querySelector(".most_popular--title");
    bestRatingTitle.innerHTML = film.title;

    const bestRatingDescription = document.querySelector(".most_popular--description");
    bestRatingDescription.innerHTML = film.overview;

    const modalTrigger = document.querySelector(".most_popular .modalTrigger");
    modalTrigger.setAttribute('data-action', "#" + modalId);
    modalTrigger.setAttribute('id', "modalTriggerBigFigure" + modalId);
    btnPopTrigger(modalTrigger, film.id);
}