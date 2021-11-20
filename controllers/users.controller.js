const User = require('../models/user.model')
const createError = require('http-errors')
const mailer = require('../config/mailer.config')
const jwt = require('jsonwebtoken')

module.exports.create = (req, res, next) => {
    const data = { name, username, bio, private, password } = req.body

    User.create(data)
    .then((user) => {
        mailer.sendValidationEmail(user)
        res.status(201).json(user)

    })
    .catch(next)
}

module.exports.update = (req, res, next) => {
    const body = { name, username, bio, private, password } = req.body

    User.findByIdAndUpdate(req.params.id, body, { new: true })
    .then(user => {
        if (user) {
            res.json(user)
        } else {
            next(createError(404, 'User not found'))
        }
    })
}

module.exports.list = (req, res, next) => {
    User.find()
        .then(users => {
            res.json(users)
        })
        .catch(next)
}
 
module.exports.login = (req, res, next) => {
    const body = ({ email, password } = req.body)

    User.findOne( { email, active: true })
    .then((user) => {
        if (user) {
            user.checkPassword(password)
            .then((match) => {
                if (match) {

                    // Cookie auth
                    //req.session.userId = user.id
                    //res.json(user)

                    //JWT auth
                    const token = jwt.sign(
                        {
                            sub: user.id,
                            exp: Math.floor(Date.now() / 1000) + 60 * 60,
                        }, process.env.JWT_SECRET)

                    res.json({
                        accessToken: token,
                    })

                } else {
                    next(createError(401, "Unauthorized"))
                }
            })
        } else {
            next(createError(404, "User not found"))
        }
    })
    .catch(next)

}


module.exports.activate = (req, res, next) => {
    User.findByIdAndUpdate(req.params.id, { active: true }, { new: true })
    .then(user => {
        if (user) {
            res.json(user)
        } else {
            next(createError(404, 'User not found'))
        }
    })
}

module.exports.logout = (req, res, next) => {
    req.session.destroy()
    res.status(204).end()
}
