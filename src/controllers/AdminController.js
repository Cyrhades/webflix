import fetch from 'node-fetch';

export default (req, res) => {
    console.log(req.query.q)

    if(req.query.q !== undefined && req.query.q != "") {

        const url = `https://api.themoviedb.org/3/search/movie?query=${req.query.q}&include_adult=false&language=en-US&page=1`;
        const options = {
            method: 'GET',
            headers: {
                accept: 'application/json',
                Authorization: `Bearer ${process.env.TMDB_TOKEN}`
            }
        };

        fetch(url, options)
            .then(responseHttp => responseHttp.json())
            .then(json => json.results.map(movie => { return {tmdb_id: movie.id, vote_average: movie.vote_average, release_date: movie.release_date, title: movie.title, poster_path: movie.poster_path } }))
            .then(movies => {
                res.render('admin', {q:req.query.q,  movies })
            })
            .catch(err => console.error('error:' + err));
    }
    else {
        res.render('admin');
    }
}