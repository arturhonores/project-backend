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

module.exports = router