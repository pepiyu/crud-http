const Post = require('../models/post.model')
const createError = require('http-errors')

module.exports.list = (req, res, next) => {
    Post.find()
        .then(posts => {
            res.json(posts)
        })
        .catch(next)
}

module.exports.create = (req, res, next) => {
    const body = { title, text, author } = req.body

    Post.create(body)
        .then(post => {
            res.status(201).json(post)
        })
        .catch(next)
    
}

module.exports.detail = (req, res, next) => {
    Post.findById(req.params.id)
    .then(post => {
        if (post) {
            res.json(post)
        } else {
            next(createError(404, 'post not found'))
        }
    })
    .catch(next)
}

module.exports.update = (req, res, next) => {
    const body = { title, text, author } = req.body

    Post.findByIdAndUpdate(req.params.id, body, { new: true })
    .then(post => {
        if (post) {
            res.json(post)
        } else {
            next(createError(404, 'post not found'))
        }
    })

    
}

module.exports.delete = (req, res, next) => {
    Post.findByIdAndDelete(req.params.id)
    .then(() => {
        res.status(204).send()
    })
    .catch(next)

}