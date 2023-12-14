const mongoose = require('mongoose')
const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

const user = require('./UserSchema')

const MediaSchema = new Schema ({
    title: {
        type: String,
        require: true
    },
    album: {
        type: String
    },
    creator: {
        type: ObjectId,
        ref: 'User',
        require: true
    },
    mediaType: {
        type: String,
        Enum: ['song', 'video'],
        require: true
    },
    duration: {
        type: String,
        require: true
    },
    storageURL: {
        type: String,
        require: true
    },
    coverURL:   {
        type: String,
        require: true
    }
}) 

const Media = mongoose.model('Media', MediaSchema);
module.exports = Media