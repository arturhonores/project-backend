const express = require('express')
const { isLoggedIn } = require('../middlewares/route-guard')
const uploaderMiddleware = require('../middlewares/uploader.middleware')

const router = express.Router()

const User = require("../models/User.model")

// profile page
router.get("/perfil", isLoggedIn, (req, res, next) => {
    res.render("user/profile", { user: req.session.currentUser })
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

    const { path: avatar } = req.file
    const { username, email } = req.body
    const { user_id } = req.params

    User
        .findByIdAndUpdate(user_id, { username, email, avatar })
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