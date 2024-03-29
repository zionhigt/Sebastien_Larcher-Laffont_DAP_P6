const btnPopTrigger = function (trigger, id) {
    const modalId = `modalMovie${id}`;
    let modalBox = document.querySelector(modalId);
    let loaderElement = null;
    const parent = trigger.parentNode;
    if (parent.querySelector(".film-loader") != null) {
        loaderElement = parent.querySelector(".film-loader");
    } else {
        loaderElement = parent.parentNode.parentNode.querySelector(".film-loader");
    }
    trigger.addEventListener('click', async function(event) {
        console.log(window.scrollY)
        event.preventDefault();
        if (loaderElement != null) {
            loaderElement.classList.add('active');
            film = await getFilmData(id);
            modalBox = buildModal(film, modalId);
            modalBox.classList.add('up');
            document.body.classList.add("modal-up");
            loaderElement.classList.remove('active');
        }

        return modalBox;
    }.bind(this));
    return trigger
}