class API {
    getTopTrending() {
        const film = {
            "genre_ids": [
              28,
              12,
              878
            ],
            "original_language": "en",
            "original_title": "Spider-Man: No Way Home",
            "poster_path": "/sDYuyvhY0FUGs0MIHGKE6H8ETJZ.jpg",
            "video": false,
            "vote_average": 8.2,
            "overview": "Après les évènements liés à l'affrontement avec Mystério, l'identité secrète de Spider-Man a été révélée. Il est poursuivi par le gouvernement américain, qui l'accuse du meurtre de Mystério, et est traqué par les médias. Cet évènement a également des conséquences terribles sur la vie de sa petite-amie M. J. et de son meilleur ami Ned. Désemparé, Peter Parker demande alors de l'aide au Docteur Strange. Ce dernier lance un sort pour que tout le monde oublie que Peter est Spider-Man. Mais les choses ne se passent pas comme prévu et cette action altère la stabilité de l'espace-temps. Cela ouvre le « Multivers », un concept terrifiant dont ils ne savent quasiment rien.",
            "release_date": "2021-12-15",
            "title": "Spider-Man: No Way Home",
            "vote_count": 10368,
            "adult": false,
            "backdrop_path": "/iQFcwSGbZXMkeyKrxbPnwnRo5fl.jpg",
            "id": 634649,
            "popularity": 7013.436,
            "media_type": "movie"
          }
        
        return Promise.resolve(film);
    }

    getImgUrl(path) {
        return "https://image.tmdb.org/t/p/original" + path;
    }
}
export default new API()