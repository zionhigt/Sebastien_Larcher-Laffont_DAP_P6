const buildModal = function (movieData, id) {
    let modalBox = null;
    if(document.querySelector(`#${id}`) == null){
        const modalTemplate = document.getElementById('modalTemplate');
        const cloneModal = document.importNode(modalTemplate.content, true);
        modalBox = cloneModal.querySelector("#modalBox");
        modalBox.setAttribute('id', id);
        
        const modalTitle = cloneModal.querySelector('h3');
        modalTitle.innerHTML = movieData.title;

        const descriptionText = movieData.description;
        const descriptionElement = cloneModal.querySelector(".caption p");
        descriptionElement.innerHTML = "<span>Description  </span></br>" + descriptionText;
        
        const modalList = cloneModal.querySelector('ul');
        const directorsText = movieData.directors.join(", ");
        const directorsElement = document.createElement("li");
        directorsElement.innerHTML = "<span>Réalisateurs  </span>" + directorsText;
        modalList.appendChild(directorsElement);

        const actorsText = movieData.actors.join(", ");
        const actorsElement = document.createElement("li");
        actorsElement.innerHTML = '<span>Acteurs  </span>' + actorsText;
        modalList.appendChild(actorsElement);

        
        
        const imdbText = movieData.imdb_score;
        const imdbElement = document.createElement("li");
        imdbElement.innerHTML = "<span>imdb  </span>" + imdbText + "/10";
        modalList.appendChild(imdbElement);

        const dateText = movieData.date_published;
        const dateElement = document.createElement("li");
        dateElement.innerHTML = "<span>Date  </span>" + dateText;
        modalList.appendChild(dateElement);
        
        const ratedText = movieData.rated;
        const ratedElement = document.createElement("li");
        ratedElement.innerHTML = "<span>Classement  </span>" + ratedText;
        modalList.appendChild(ratedElement);
        
        const durationText = movieData.duration;
        const durationElement = document.createElement("li");
        durationElement.innerHTML = "<span>Durée  </span>" + durationText + " mins";
        modalList.appendChild(durationElement);

        const countryText = movieData.countries.join(", ");
        const countryElement = document.createElement("li");
        countryElement.innerHTML = "<span>Pays d'origine  </span>" + countryText;
        modalList.appendChild(countryElement);

        const genresElement = document.createElement("li");
        genresElement.classList.add("flags");
        genresElement.innerHTML = "<span>Genres  </span>";
        movieData.genres.forEach(function (genre) {
            flagGenre = buildFlag(genre);
            genresElement.appendChild(flagGenre);
            
        })
        
        const boxOfficeText = 5;//movieData.boxOffice;
        const boxOfficeElement = document.createElement("li");
        boxOfficeElement.innerHTML = "<span>Box-office  </span>" + boxOfficeText;
        modalList.appendChild(boxOfficeElement);
        
        modalList.appendChild(genresElement);
        
        const btnClose = cloneModal.querySelector("#closeModal");
        btnClose.setAttribute('id', `closeModal${movieData.id}`);
        btnCloseTrigger(btnClose, modalBox);
        
        const modalImage = cloneModal.querySelector("img");
        modalImage.setAttribute('src', movieData.image_url);
        document.body.appendChild(modalBox);
    } else {
        modalBox = document.querySelector(`#${id}`);
    }
    return modalBox;
        
}