const router = require("express").Router()
const SeriesApiHandler = require('../services/series-api.service')

const apiHandler = new SeriesApiHandler()

// all
router.get('/series-new', (req, res, next) => {
    apiHandler.getSeries(req)
    .then (data => {
      res.render('api/new-series', data)
    })
    .catch(err => next(err))
})

// details

router.get('/series/detalles/:imdbId', (req, res, next) => {
  const imdbId = req.params.imdbId

  apiHandler.getSeriesDetails(imdbId)
    .then(seriesDetails => {
      res.render('api/series-details', { series: seriesDetails.result })
    })
    .catch(err => {next(err)})
})

// filter
router.get('/series-filtradas', (req, res, next) => {
    res.render("api/series-filter")
})

router.post('/series-filtradas', (req, res, next) => {
    apiHandler.getFilteredSeries(req)
    .then(data => {
      res.render('api/series-filter', data)
    })
    .catch(err => {next(err)})
})



module.exports = router