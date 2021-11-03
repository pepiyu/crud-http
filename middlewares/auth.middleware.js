const createError = require('http-errors')
const User = require('../models/user.model')
module.exports.loadUser = (req, res, next) => {
    if (req.session.userId) {
        User.findById(req.session.userId)
        .then((user) => {
            if (user) {
                req.user = user
            }
            next()
        }).catch(next)
    } else {
        next()
    }

}

module.exports.isAuthenticated = (req, res, next) => {
    if (req.user) {
        next()
    } else {
        next(createError(401, "Unauthorized"))
    }
}