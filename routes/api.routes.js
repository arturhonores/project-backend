const router = require("express").Router();
const MoviesApiHandler = require('../services/stream-api.service');

const apiHandler = new MoviesApiHandler();

router.get('/peliculas-new', (req, res, next) => {
    apiHandler.getMovies(req, res, next);
});

module.exports = router;


