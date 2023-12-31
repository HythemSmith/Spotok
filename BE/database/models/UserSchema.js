const mongoose = require('mongoose')
const Schema = mongoose.Schema;

const UserSchema = new Schema({
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
    dateOfBirth: {
        type: Date,
        required: true
    },
    avatar:{
        type: String,
        default: "https://drive.google.com/uc?id=1NsbNaF1VS_I_2Yvtikez3OLWzNPTDW-3"
    }
});


const User = mongoose.model('User', UserSchema, 'users')
module.exports = User