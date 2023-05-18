const express = require('express')
const { isLoggedIn } = require('../middlewares/route-guard')
const uploaderMiddleware = require('../middlewares/uploader.middleware')

const router = express.Router()

const User = require("../models/User.model")
const Event = require("../models/Event.model")

// profile page
router.get("/perfil", isLoggedIn, (req, res, next) => {
    const user_id = req.session.currentUser._id;

    Event.find({ participants: user_id })
        .then(events => {
            res.render("user/profile", { user: req.session.currentUser, events });
        })
        .catch(err => next(err));
})

// edit profile
router.get("/perfil/editar-perfil/:user_id", isLoggedIn, (req, res, next) => {

    const { user_id } = req.params

    User
        .findById(user_id)
        .then(user => res.render('user/edit-profile', user))
        .catch(err => next(err))
})

router.post("/perfil/editar-perfil/:user_id", uploaderMiddleware.single('avatar'), isLoggedIn, (req, res, next) => {
    const imageUrl = req.file ? req.file.path : null; // Si req.file no está presente, imageUrl será null
    const { username, email } = req.body
    const { user_id } = req.params
    const updateData = { username, email };
    if (imageUrl) {
        updateData.imageUrl = imageUrl; // Si imageUrl no es null, agrega la propiedad al objeto updateData
    }

    User
        .findByIdAndUpdate(user_id, updateData)
        .then(() => res.redirect("/perfil"))
        .catch(err => next(err))
})

// delete user
router.post('/perfil/eliminar-perfil/:user_id', isLoggedIn, (req, res, next) => {

    const { user_id } = req.params

    User
        .findByIdAndDelete(user_id)
        .then(() => res.redirect("/registro"))
        .catch(err => console.log(err))
})

module.exports = router