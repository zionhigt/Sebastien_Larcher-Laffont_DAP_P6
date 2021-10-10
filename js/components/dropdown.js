var dropDownTrigger = document.getElementById("dropCategoryTrigger");
var categoriesListContainer = document.getElementById("categoriesList");
var categoriesList = categoriesListContainer.querySelector('ul');

dropDownTrigger.addEventListener("click", function (event) {
    event.preventDefault();
    var targetId = event.target.getAttribute("for")
    var actionTarget = document.querySelector(`${targetId}`);
    actionTarget.classList.toggle('active')
});