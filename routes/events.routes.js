const router = require("express").Router()
const { isLoggedIn, checkRoles } = require('../middlewares/route-guard')
const uploaderMiddleware = require('../middlewares/uploader.middleware')

const Event = require('../models/Event.model')

// create event
router.get("/eventos/crear", isLoggedIn, checkRoles('ADMIN'), (req, res, next) => {
    res.render('events/create-event')

})

router.post("/eventos/crear", uploaderMiddleware.single('imageUrl'), (req, res, next) => {

    const { path: imageUrl } = req.file
    const { name, description, location, date } = req.body

    Event
        .create({ name, description, location, date, imageUrl })
        .then(() => res.redirect("/eventos/lista"))
        .catch(err => next(err))
})

// event list
router.get("/eventos/lista", isLoggedIn, (req, res, next) => {
    const userRole = {
        isAdmin: req.session.currentUser?.role === 'ADMIN',
        isUser: req.session.currentUser?.role === 'USER'
    }

    Event
        .find()
        .populate('participants')
        .then(events => res.render('events/event-list', { events, userRole }))
        .catch(err => next(err))
});

// event details
router.get("/eventos/detalles/:event_id", isLoggedIn, checkRoles('ADMIN'), (req, res, next) => {
    const { event_id } = req.params

    Event
        .findById(event_id)
        .then(events => res.render('events/event-details', { events }))
        .catch(err => next(err))
})

// edit event
router.get("/eventos/editar/:event_id", isLoggedIn, checkRoles('ADMIN'), (req, res, next) => {
    const { event_id } = req.params

    Event
        .findById(event_id)
        .then(events => res.render(`events/edit-event`, events))
        .catch(err => next(err))
})

router.post("/eventos/editar/:event_id", isLoggedIn, checkRoles('ADMIN'), uploaderMiddleware.single('imageUrl'), (req, res, next) => {
    const imageUrl = req.file ? req.file.path : null; // Si req.file no está presente, imageUrl será null
    const { name, description, location, date } = req.body
    const { event_id } = req.params
    const updateData = { name, description, location, date };
    if (imageUrl) {
        updateData.imageUrl = imageUrl; // Si imageUrl no es null, agrega la propiedad al objeto updateData
    }

    Event
        .findByIdAndUpdate(event_id, updateData)
        .then(() => res.redirect('/eventos/lista'))
        .catch(err => next(err))
})


// delete event
router.post("/eventos/eliminar/:event_id", isLoggedIn, checkRoles('ADMIN'), (req, res, next) => {
    const { event_id } = req.params

    Event
        .findByIdAndDelete(event_id)
        .then(() => res.redirect('/eventos/lista'))
        .catch(err => next(err))
})

//register to an event
router.post("/eventos/inscribirse/:event_id", isLoggedIn, (req, res, next) => {
    const { event_id } = req.params;
    const user_id = req.session.currentUser._id;

    Event.findByIdAndUpdate(event_id, { $addToSet: { participants: user_id } })
        .then(() => res.redirect("/eventos/lista"))
        .catch(err => next(err));
});

// unsubscribe from an event
router.post("/eventos/desinscribirse/:event_id", isLoggedIn, (req, res, next) => {
    const { event_id } = req.params;
    const user_id = req.session.currentUser._id;

    Event.findByIdAndUpdate(event_id, { $pull: { participants: user_id } })
        .then(() => res.redirect("/perfil"))
        .catch(err => next(err));
});


module.exports = router

