const mongoose = require('mongoose')
const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

const UserSchema = new Schema ({
    ID: {
        type: ObjectId
    },
    title: {
        type: String,
        require: true
    },
    creator: {
        type: ObjectId,
        require: true
    },
    album: {
        type: ObjectId
    },
    mediaType: {
        type: String,
        Enum: ['song', 'video'],
        require: true
    },
    storageURL: {
        type: String,
        require: true
    },
    duration: {
        type: String,
        require: true
    },
    mediaURL:   {
        type: String,
        require: true
    }
}) 

const User = mongoose.model('User', UserSchema);
