const router = require("express").Router()
const SeriesApiHandler = require('../services/series-api.service')

const apiHandler = new SeriesApiHandler()

router.get('/series-new', (req, res, next) => {
    apiHandler.getSeries(req, res, next)
})

router.get('/series-filtradas', (req, res, next) => {
    res.render("api/series-filter")
})

router.post('/series-filtradas', (req, res, next) => {
    apiHandler.getFilteredSeries(req, res, next)
})

// series details

router.post('/series/detalles/:imdbId', (req, res, next) => {

    const { imdbId } = req.params
    
    apiHandler
    .getSeriesDetails(imdbId)
    .then(response => { res.render('series/details', {shows: response.data})})
    .catch(err => next(err))
    
})

module.exports = router