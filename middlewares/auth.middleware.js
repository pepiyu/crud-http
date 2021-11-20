const createError = require('http-errors')
const User = require('../models/user.model')
const jwt = require('jsonwebtoken')
module.exports.loadUser = (req, res, next) => {
    if (req.session.userId) {
        User.findById(req.session.userId)
        .then((user) => {
            if (user) {
                req.user = user
            }
            next()
        }).catch(next)
    } else if (req.headers.authorization) {
        const token = req.headers.authorization.split('Bearer ')[1]
        jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
            console.log(decoded);

            if(err) {
                next()
            } else {
                User.findById(decoded.sub)
                    .then((user) => {
                        if (user) {
                            req.user = user;
                        }
                        next()
                    })
                    .catch(next)

            }
        })

    } else {
        next()
    }

}

module.exports.isAuthenticated = (req, res, next) => {
    if (req.headers.authorization) {
        next()
    } else {
        next(createError(401, "Unauthorized"))
    }
}