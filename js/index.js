import topTrending from "./components/top_trending.js"

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
topTrending()
.then(function() {
    console.log("OK");
    stopLoader();
})
.catch(function(err) {
    console.error(err);
})