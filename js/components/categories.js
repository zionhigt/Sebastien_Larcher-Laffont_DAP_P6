var buildCategories = function (categories) {
    categories.forEach(function (category) {
        var listElement = document.createElement("li");
        var listElementLink = document.createElement("a");
        listElement.appendChild(listElementLink);
        listElementLink.innerHTML = category.name;
        listElementLink.setAttribute('href', `#section${category.name}`);
        categoriesList.appendChild(listElement);
        buildSection(category);
    });
}

