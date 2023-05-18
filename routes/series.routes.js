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

// router.get('/series/detalles/:imdbId', (req, res, next) => {
//   const { imdb_id } = req.params;
//   const country = req.query.country;

//   apiHandler.getSeriesDetails(imdb_id, country)
//     .then(response => {
//       const showData = response.data

//       const showDetails = {
//         title: showData.title,
//         cast: showData.cast,
//         firstAirYear: showData.firstAirYear,
//         lastAirYear: showData.lastAirYear,
//         imdbRating: showData.imdbRating,
//         genres: showData.genres,
//         creators: showData.creators,
//         seasonCount: showData.seasonCount,
//         posterPath: showData.posterPath,
//         streamingData: apiHandler.processStreamingInfo(showData)
//       }

//       res.render("api/series-details", { show: showDetails })
//     })
//     .catch(err => next(err))
// })

module.exports = router