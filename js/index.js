var stopLoader = function() {
    var loader = document.querySelector(".loader");
    var logo = loader.querySelector(".loader__logo");
    var spinner = loader.querySelector(".loader__circle--spinner");
    spinner.classList.add("hide");
    setTimeout(function(){
        loader.classList.remove("active");
        loader.style.display = "none";
    }, 1000);
    logo.classList.add("move");
    return 0;

}

var main = async function() {

    var film = await getBestRatingMovie()
    modalId = "bestRatingMovieModal";
    var bestRatingImage = document.querySelector(".most_popular--image img");
    var bestRatingTitle = document.querySelector(".most_popular--title");

    bestRatingImage.setAttribute('src', film.image_url);
    bestRatingTitle.innerHTML = film.title;

    buildModal(film, modalId)
    modalTrigger = document.getElementById("modalTrigger");
    btnPopTrigger(modalTrigger);

    var bestRatingCategory = await getBestRatingCategory()
    buildCategories([{ name: "Tendances", moviesData: bestRatingCategory }]);

    
    return await getCategories()
    
}

var init_main = function() {
    main()
    .then(function (data) {
        console.log(data)
        categoriesPromises = data.results.map(function (categories) {
            return getMoviesByCategory(category=categories.name, min=7);
        });
        Promise.all(categoriesPromises)
            .then(function (categories) {
                categories = categories.filter(function (item) {
                    return item.moviesData.count > 7;
                });
                stopLoader();
                categories[0]
                buildCategories(categories.slice(0, 5));
                return categories;
            })
    })
    .catch(function (err) {
        console.log(err);
    });
}

initDependencies(init_main);
