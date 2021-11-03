require('dotenv').config()
const User = require('./models/user.model')
const createError = require('http-errors')
const express = require('express')
const logger = require('morgan')
const mongoose = require('mongoose')
require('./config/db.config')
const session = require('./config/session.config')
const auth = require('./middlewares/auth.middleware')

const app = express()

// Middlewares
app.use(logger('dev'))
app.use(express.json())
app.use(session)
app.use(auth.loadUser)


//Routes

const routes = require('./config/routes.config')
app.use('/api', routes)



// Error handling
app.use((req, res, next) => {
    next(createError(404, 'Route not found'))
})
  
app.use((error, req, res, next) => {
    if (error instanceof mongoose.Error.ValidationError) {
        error = createError(400, error);
    } else if (error instanceof mongoose.Error.CastError && error.message.includes('_id')) {
        error = createError(404, 'Resource not found');
    } else if (error.message.includes('E11000')) {
        error = createError(409, 'Duplicated');
        //409 recurso duplicado error conflict
    } else if (!error.status) {
        error = createError(500, error);
    }
  
    if (error.status >= 500) {
      console.error(error);
    }
  
    const data = {};
    data.message = error.message;
  
    if (error.errors) {
        data.errors = Object.keys(error.errors)
            .reduce((errors, key) => {
            errors[key] = error.errors[key].message;
            return errors;
        }, {});
    }
    res.status(error.status).json(data);
});


const port = process.env.PORT || 8000
app.listen(port, () => {
    console.info(`Application running. Port: ${port}`)
})