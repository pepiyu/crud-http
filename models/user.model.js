const mongoose = require('mongoose')
const bcrypt = require('bcrypt')

const schema = new mongoose.Schema({
    name: {
        type: String, 
        required: true
    },
    email: {
        type: String, 
        required: true 
    },
    password: {
        type: String, 
        required: true 
    },
    bio: String,
    active: {
        type: Boolean, 
        default: true 
    },
    createdAt: Date,
    updatedAt: Date,
}, { timestamps: true,
    toJSON: {
        transform: (doc, ret) => {
            ret.id = doc._id
            delete ret._id
            delete ret.__v
        }
    }
})

schema.pre('save', function(next) {
    if (this.isModified('password')) {
        bcrypt.genSalt(10)
        .then(salt => {
            bcrypt.hash(this.password, salt)
            .then((hash) => {
                this.password = hash;
                next()
            })
            .catch(err => next(err))
                
        })
    } else {
        next()
    }
})

schema.methods.checkPassword = function (password) {
    return bcrypt.compare(password, this.password)
}


module.exports = mongoose.model('User', schema)