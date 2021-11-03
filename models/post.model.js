const mongoose = require("mongoose")

const schema = new mongoose.Schema({
    id: String,
    createdAt: Date,
    updatedAt: Date,
    title: {
        type: String,
        required: true,
        minlength: 5,
    },
    text: {
        type: String,
        required: true,
        minlength: 5,
    },
    author: {
        type: String,
        required: true,
    },

}, { timestamps: true,
    toJSON: {
        transform: (doc, ret) => {
            ret.id = doc._id
            delete ret._id
            delete ret.__v
        }
    }

})

module.exports = mongoose.model('Post', schema)