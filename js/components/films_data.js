const Films = {
    //id: data
}

const getFilmData = async function(id) {
    if(Films.hasOwnProperty(id)) {
        return Films[id];
    } else {
        const film = await get(getURL("/titles/" + id));
        Films[id] = film;
        return film;
    }
}