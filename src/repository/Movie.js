import con from '../../app/database_sql.js';

export function addMovieGenre(movie_id, genre_id) {    
    return con.promise().query("INSERT INTO `movie_genre` SET ?", {movie_id, genre_id});
}

export function addMovie(movie) {    
    return con.promise().query("INSERT INTO `movie` SET ?", movie);
}


export function getByTmdbId(tmdb_id) {    
    return con.promise().query("SELECT * FROM `movie` WHERE ?", {tmdb_id}).then((result) => {
        if(result[0].length ==1) {
            return result[0];
        }
        return false;
    });
}