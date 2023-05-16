const express = require('express');
const router = express.Router();

/* GET home page */
router.get("/", (req, res, next) => {
  res.render("index");
});

router.get("/movie-filter", (req, res, next) => {
  res.render("api/movie-filter")
})

router.get("/series-filter", (req, res, next) => {
  res.render("api/series-filter")
})

module.exports = router;

