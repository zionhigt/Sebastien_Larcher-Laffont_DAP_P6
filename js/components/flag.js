export default function (flag_name) {
    const flagElement = document.createElement('div');
    flagElement.classList.add("flag");
    flagElement.innerHTML = flag_name;
    return flagElement;
}