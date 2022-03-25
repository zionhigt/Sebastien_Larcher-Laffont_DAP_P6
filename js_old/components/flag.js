const buildFlag = function (flag_name) {
    flagElement = document.createElement('div');
    flagElement.classList.add("flag");
    flagElement.innerHTML = flag_name;
    return flagElement;
}