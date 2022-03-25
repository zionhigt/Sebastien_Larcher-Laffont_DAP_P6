const escalatorContainer = document.querySelector(".escalator");
const escalatorTrigger = escalatorContainer.querySelector("a");
const headerElement = document.querySelector("header");

escalatorTrigger.addEventListener("click", function(e) {
    e.preventDefault();
    e.stopPropagation();
    window.scroll({
        top: 0,
        behavior: "smooth"
    });
});

window.addEventListener("scroll", function (event) {
    let opacityRatio = window.scrollY/(headerElement.clientHeight);
    const maxOpacity = 0.7;
    if (opacityRatio > maxOpacity) {
        opacityRatio = maxOpacity;
    }
    escalatorContainer.style.opacity = opacityRatio;
})
