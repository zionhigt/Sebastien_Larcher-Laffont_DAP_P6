const dropDownTrigger = document.getElementById("dropCategoryTrigger");
const categoriesListContainer = document.getElementById("categoriesList");
const categoriesList = categoriesListContainer.querySelector('ul');
const actionTarget = document.querySelector("#categoriesList");

dropDownTrigger.addEventListener("click", function (event) {
    event.preventDefault();
    actionTarget.classList.toggle('active');
});

const addCategoryLink = function(name) {
    const listElement = document.createElement("li");
    const listElementLink = document.createElement("a");
    listElementLink.classList.add('eye');
    listElementLink.addEventListener("click", function(event) {
        event.preventDefault();
        const target = document.querySelector(event.target.getAttribute('href'));
        window.scroll({
            top: target.offsetTop,
            behavior: "smooth"
        });
        actionTarget.classList.remove('active');
    });
    listElement.appendChild(listElementLink);
    listElementLink.innerHTML = name + '<i class="fas fa-eye"></i>';
    listElementLink.setAttribute('href', `#section${name}`);
    categoriesList.appendChild(listElement);
}