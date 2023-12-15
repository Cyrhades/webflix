import {search, details} from "../services/themoviebdService.js";
import {addMovie} from "../repository/Movie.js";

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
        details(req.params.id).then(movie => {
            res.render('admin/save', {movie});
        })
    } else {
        res.redirect('/admin')
    }   
}

export function saveInBddMovie(req, res) {
    if(req.params.id !== undefined && parseInt(req.params.id) > 0) {
        details(req.params.id).then(movie => {
            console.log(movie)
            //addMovie(movie);
        })
    } else {
        res.redirect('/admin')
    }   
}
