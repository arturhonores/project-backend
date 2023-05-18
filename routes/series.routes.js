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

// router.get('/series/detalles/:imdb_id', (req, res, next) => {
//   apiHandler.getSeriesDetails(req, res, next)
// })


router.get('/series/detalles/:imdbId', (req, res, next) => {
  const imdbId = req.params.imdbId

  apiHandler.getSeriesDetails(imdbId)
    .then(seriesDetails => {
      console.log(seriesDetails)
      res.render('api/series-details', { series: seriesDetails.result })
    })
    .catch(err => {next(err)})
})


module.exports = router