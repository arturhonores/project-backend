const router = require("express").Router()
const bcrypt = require('bcryptjs')
const saltRounds = 10

const User = require("../models/User.model")

// Signup
router.get('/registro', (req, res, next) => res.render('auth/signup'))

router.post('/registro', (req, res, next) => {
    const { username, email, plainPassword } = req.body

    bcrypt
        .genSalt(saltRounds)
        .then(salt => bcrypt.hash(plainPassword, salt))
        .then(hashedPassword => User.create({ username, email, password: hashedPassword }))
        .then(() => res.redirect('/iniciar-sesion'))
        .catch(err => next(err))

})

// Login
router.get('/iniciar-sesion', (req, res, next) => res.render('auth/login'))

router.post('/iniciar-sesion', (req, res, next) => {
    const { email, password } = req.body

    if (email.length === 0 || password.length === 0) {
        res.render('auth/login', { errorMessage: 'Los campos son obligatorios' })
        return
    }

    User
        .findOne({ email })
        .then(foundUser => {

            if (!foundUser) {
                res.render('auth/login', { errorMessage: 'Usuario no reconocido' })
                return
            }

            if (!bcrypt.compareSync(password, foundUser.password)) {
                res.render('auth/login', { errorMessage: 'Contraseña incorrecta' })
                return
            }

            req.session.currentUser = foundUser // login!
            res.redirect('/perfil')
        })
})

//Logout
router.get('/desconectar', (req, res, next) => {
    req.session.destroy(() => res.redirect('/iniciar-sesion'))
})

module.exports = router;