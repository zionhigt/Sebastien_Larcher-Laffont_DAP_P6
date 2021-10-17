const stopLoader = function() {
    const loader = document.querySelector(".loader");
    const logo = loader.querySelector(".loader__logo");
    const spinner = loader.querySelector(".loader__circle--spinner");
    spinner.classList.add("hide");
    setTimeout(function(){
        loader.classList.remove("active");
        loader.style.display = "none";
    }, 1000);
    logo.classList.add("move");
    return 0;

}

const main = async function() {

    const film = await getBestRatingMovie()
    const modalId = `modalMovie${film.id}`;
    const bestRatingImage = document.querySelector(".most_popular--image img");
    bestRatingImage.setAttribute('src', film.image_url);

    const bestRatingTitle = document.querySelector(".most_popular--title");
    bestRatingTitle.innerHTML = film.title;

    const bestRatingDescription = document.querySelector(".most_popular--description");
    bestRatingDescription.innerHTML = film.description;

    const modalTrigger = document.querySelector(".most_popular .modalTrigger");
    modalTrigger.setAttribute('data-action', "#" + modalId);
    modalTrigger.setAttribute('id', "modalTriggerBigFigure" + modalId);
    btnPopTrigger(modalTrigger, film.id);

    const bestRatingCategory = await getBestRatingCategory()
    buildSection({ name: "Tendances", moviesData: bestRatingCategory.results.slice(1, bestRatingCategory.count) });

    
    return await getCategories()
    
}

const initMain = function() {
    main()
    .then(async function (data) {
        const categories = []
        for (category of data.results) {
            let gotCategory = await getMoviesByCategory(category = category.name, min = 7);
            if(gotCategory.moviesData.length >= 7) {
                categories.push(gotCategory)
            } else {
                continue;
            }
            if (categories.length == 3) {
                break;
            }
        }
        buildCategories(categories);
        stopLoader();
        return categories;
    })
    .catch(function (err) {
        console.log(err);
    });
}

initDependencies(initMain);