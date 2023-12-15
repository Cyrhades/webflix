import {search, details} from "../services/themoviebdService.js";
import {getByTmdbId, addMovie} from "../repository/Movie.js";

export function searchMovie(req, res) {
    if(req.query.q !== undefined && req.query.q != "") {
        search(req.query.q).then(movies => {  
            res.render('admin', {q:req.query.q,  movies })
        });
    }
    else {
        res.render('admin');
    }
}


export function saveMovie(req, res) {
    if(req.params.id !== undefined && parseInt(req.params.id) > 0) {
        getByTmdbId(req.params.id).then((result) => {
            details(req.params.id).then(movie => {
                res.render(
                    'admin/save', 
                    {movie, exists:(result ? true : false)}
                );
            })
        })
    } else {
        res.redirect('/admin')
    }   
}

export function saveInBddMovie(req, res) {
    if(req.params.id !== undefined && parseInt(req.params.id) > 0) {
        details(req.params.id).then(movie => {
            const saveMovie = {
                tmdb_id: movie.tmdb_id,
                title: movie.title,
                release_date: movie.release_date  || "",
                synopsis: movie.overview  || "",
                note: movie.vote_average  || 0,
                poster: movie.poster_path  || "",
                backdrop: movie.backdrop_path  || "",
                tagline: movie.tagline || "",
                user_id: req.user_id,
            };
            addMovie(saveMovie).then((result) => {
                const idMovie = result[0].insertId;
                // Gérer l'enregistrement des genres


                req.flash("notify", `Le film a bien été enregistré !`)
                res.redirect('/admin/movie/'+req.params.id);
            })
        })
    } else {
        res.redirect('/admin')
    }   
}
