const express = require('express')
const router = express.Router()
const posts = require('../controllers/posts.controller')
const users = require('../controllers/users.controller')
const auth = require('../middlewares/auth.middleware')
const mailer = require('../config/mailer.config')
const upload = require('../config/multer.config')
// Routers

router.get('/posts', auth.isAuthenticated, posts.list)
router.post('/posts', auth.isAuthenticated, upload.single("image"), posts.create)
router.get('/posts/:id', auth.isAuthenticated, posts.detail)
router.patch('/posts/:id', auth.isAuthenticated, posts.update)
router.delete('/posts/:id', auth.isAuthenticated, posts.delete)

router.get('/users', auth.isAuthenticated, users.list)
router.post('/users', users.create)
router.patch('/users/:id', auth.isAuthenticated, users.update)
router.get('/users/:id/activate', users.activate)
router.post('/login', users.login)
router.post('/logout', auth.isAuthenticated, users.logout)

module.exports = router