const mongoose = require('mongoose')
const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

const UserSchema = new Schema ({
    userID: {
        type: ObjectId
    },
    userName: {
        type: String,
        require: true
    },
    email: {
        type: String,
        require: true
    },
    password: {
        type: String,
        require: true
    },
    gender: {
        type: Boolean,
        require: true
    },
    dateOfBirth: {
        type: Date,
        require: true
    }
}) 

const User = mongoose.model('User', UserSchema)
module.exports = User