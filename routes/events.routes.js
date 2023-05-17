const router = require("express").Router()

const Event = require('../models/Event.model')
const User = require('../models/User.model')

// create event

router.get("/eventos/crear", (req, res, next) => {
    res.render('events/create-event')
//   User
//     .find()
//     .then( usersFromDB => res.render('events/create-event', {usersFromDB}) )
//     .catch(err => next(err))

})

router.post("/eventos/crear", (req, res, next) => {

    const { name, description, location, date } = req.body

    Event
    .create({ name, description, location, date })
    .then(() => res.redirect("/eventos/lista"))
    .catch(err => next(err))
})

// event list

router.get("/eventos/lista", (req, res, next) => {
  Event
  .find()
    .then(events => res.render('events/event-list', { events }))
    .catch(err => next(err));
});


// edit event

router.get("/eventos/editar/:event_id", (req, res, next) => {
    const { event_id } = req.params

    Event
    .findById(event_id)
    .then(events => res.render(`events/edit-event`, events))
    .catch(err => next(err))
})

router.post("/eventos/editar/:event_id", (req, res, next) => {
  const { name, description, location, date } = req.body
  const { event_id } = req.params
  
  Event 
  .findByIdAndUpdate(event_id, { name, description, location, date })
  .then(() => res.redirect('/eventos/lista'))
  .catch(err => next(err))
})


// delete event

router.post("/eventos/eliminar/:event_id", (req, res, next) => {
    const { event_id } = req.params

    Event
    .findByIdAndDelete(event_id)
    .then(() => res.redirect('/eventos/lista'))
    .catch(err => next(err))
})
module.exports = router

