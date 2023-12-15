import {search, details} from "../services/themoviebdService.js";
import * as Movie from "../repository/Movie.js";
import * as Genre from "../repository/Genre.js";

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
        Movie.getByTmdbId(req.params.id).then((result) => {
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

            const idsGenre = [];
            const promises = [];
            movie.genres.forEach(async (genre) => {
                promises[promises.length] = Genre.getByTmdbId(genre.id).then(async (currentGenre) => {
                    if(currentGenre != false) {
                        idsGenre.push(currentGenre.id);
                    } else {
                        await Genre.addGenre({tmdb_id: genre.id, name: genre.name }).then((result) => {
                            idsGenre.push(result[0].insertId);
                        })
                    }
                })
            });

            Promise.all(promises).then(() => {
                Movie.addMovie(saveMovie).then((result) => {
                    idsGenre.forEach(async (genre) => {
                        await Movie.addMovieGenre(result[0].insertId, genre);
                    });
                    req.flash("notify", `Le film a bien été enregistré !`)
                    res.redirect('/admin/movie/'+req.params.id);
                })
            })
        })
    } else {
        res.redirect('/admin')
    }   
}
