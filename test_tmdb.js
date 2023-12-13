import fetch from 'node-fetch';


const url = 'https://api.themoviedb.org/3/search/movie?query=terminator&include_adult=false&language=en-US&page=1';
const options = {
  method: 'GET',
  headers: {
    accept: 'application/json',
    Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJkZmI0NDUyYThmNTA1MGNmNTNjNGNhZGE0OWY1ZTAzNyIsInN1YiI6IjVhZTMwODNhMGUwYTI2MmE2NzAzNmZiZSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.L6WAW12Akm4a0FlbTGqUWNNOGgdCTlWJKUbJVXc0hHs'
  }
};

fetch(url, options)
  .then(res => res.json())
  .then(json => json.results.map(movie => { return {vote_average: movie.vote_average, release_date: movie.release_date, title: movie.title, poster_path: movie.poster_path } }))
  .then(json => console.log(json))
  .catch(err => console.error('error:' + err));