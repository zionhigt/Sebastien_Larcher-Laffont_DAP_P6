const btnCloseTrigger = function(trigger, modalBox) {
    trigger.addEventListener('click', function (event) {
        event.preventDefault();
        document.body.classList.remove("modal-up");
        modalBox.classList.remove("up");
    });
    return trigger
}