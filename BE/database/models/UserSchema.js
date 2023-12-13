const mongoose = require('mongoose')
const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

const UserSchema = new Schema({
    userID: {
        type: ObjectId,
        unique: true,
        default: () => new mongoose.Types.ObjectId()
    },
    userName: {
        type: String,
        required: true
    },
    email: {
        type: String,
        unique: true,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    gender: {
        type: Boolean,
        required: true
    },
    dateOfBirth: {
        type: Date,
        required: true
    }
});


const User = mongoose.model('User', UserSchema)
module.exports = User