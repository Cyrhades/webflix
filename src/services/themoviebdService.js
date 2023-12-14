import fetch from 'node-fetch';

export function search(keyword) {
    const url = `https://api.themoviedb.org/3/search/movie?query=${keyword}&include_adult=false&language=en-US&page=1`;
    const options = {
        method: 'GET',
        headers: {
            accept: 'application/json',
            Authorization: `Bearer ${process.env.TMDB_TOKEN}`
        }
    };

    return fetch(url, options)
        .then(responseHttp => responseHttp.json())
        .then(json => json.results.map(movie => { 
            return {tmdb_id: movie.id, vote_average: movie.vote_average, release_date: movie.release_date, title: movie.title, poster_path: movie.poster_path } }))
        .catch(err => console.error('error:' + err));
}


export function details(id) {
    const url = `https://api.themoviedb.org/3/movie/${id}?language=fr-FR`;
    const options = {
        method: 'GET',
        headers: {
            accept: 'application/json',
            Authorization: `Bearer ${process.env.TMDB_TOKEN}`
        }
    };

    return fetch(url, options)
        .then(responseHttp => responseHttp.json())
        .then((json) => { 
            return {
                tmdb_id: json.id, 
                vote_average: json.vote_average, 
                release_date: json.release_date,
                title: json.title, 
                poster_path: json.poster_path,
                backdrop_path: json.backdrop_path,
                genres: json.genres,
                overview: json.overview,
                tagline: json.tagline
            } 
        })
        .catch(err => console.error('error:' + err));
}