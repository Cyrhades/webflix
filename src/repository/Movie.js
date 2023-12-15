import con from '../../app/database_sql.js';

export function addMovie(movie) {    

    return con.promise().query("INSERT INTO `movie` SET ?", movie);
}