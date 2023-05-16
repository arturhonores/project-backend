const router = require("express").Router()

const Event = require('../models/Event.model')
const User = require('../models/User.model')

// create event

router.get("/events/create", (req, res, next) => {
  User
    .find()
    .then( usersFromDB => res.render('events/create-event', {usersFromDB}) )
    .catch(err => next(err))

})


module.exports = router