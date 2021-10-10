var btnPopTrigger = function (trigger) {
    trigger.addEventListener('click', function (event) {
        event.preventDefault()
        var modalId = event.target.getAttribute('data-action');
        var modalBox = document.querySelector(modalId);
        modalBox.classList.add('up');
        body.classList.add("modal-up");
    });
    return trigger
}