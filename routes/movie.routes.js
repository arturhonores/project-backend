
const router = require("express").Router()
const { findByIdAndUpdate } = require("../models/User.model")
const MoviesApiHandler = require('../services/movie-api.service')
// modelo user
const apiHandler = new MoviesApiHandler()

// all
router.get('/peliculas-new', (req, res, next) => {
    apiHandler.getMovies(req)
        .then(data => {
            res.render('api/new-movie', data)
        })
    .catch(err => next(err))
})

// details

router.get('/peliculas/detalles/:imdbId', (req, res, next) => {
  const imdbId = req.params.imdbId

  apiHandler.getMovieDetails(imdbId)
    .then(movieDetails => {
      console.log(movieDetails)
      res.render('api/movie-details', { movie: movieDetails.result })
    })
    .catch(err => {next(err)})
})

// filter
router.get('/peliculas-filtradas', (req, res, next) => {
    res.render("api/movie-filter")
});

router.post('/peliculas-filtradas', (req, res, next) => {
    apiHandler.getFilteredMovies(req)
        .then(data => {
            res.render('api/movie-filter', data)
        })
        .catch(next)
})

// fav
// router.post('/', (req, res, next) => {
//     req.session id usuario
//     findByIdAndUpdate - agarrar id y $push fav
//     redirect a donde estoy
// })

module.exports = router

