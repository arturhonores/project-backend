const isLoggedIn = (req, res, next) => {
    req.session.currentUser ? next() : res.render('auth/login', { errorMessage: 'Inicia sesión para continuar' })
}

const checkRoles = (...admittedRoles) => (req, res, next) => {

    const isAdmitted = admittedRoles.includes(req.session.currentUser.role)

    if (isAdmitted) {
        next()
    } else {
        res.render('auth/login', { errorMessage: 'Acceso no autorizado' })
    }
}

module.exports = { isLoggedIn, checkRoles }