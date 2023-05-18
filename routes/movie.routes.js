
const router = require("express").Router();
const MoviesApiHandler = require('../services/movie-api.service');

const apiHandler = new MoviesApiHandler();

router.get('/peliculas-new', (req, res, next) => {
    apiHandler.getMovies(req)
        .then(data => {
            res.render('api/new-movie', data);
        })
        .catch(next);
});

router.get('/peliculas-filtradas', (req, res, next) => {
    res.render("api/movie-filter");
});

router.post('/peliculas-filtradas', (req, res, next) => {
    apiHandler.getFilteredMovies(req)
        .then(data => {
            res.render('api/movie-filter', data);
        })
        .catch(next);
});

module.exports = router;

