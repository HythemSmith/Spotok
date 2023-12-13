const mongoose = require('mongoose')
const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

const MediaSchema = new Schema ({
    ID: {
        type: ObjectId,
        unique: true,
        default: () => new mongoose.Types.ObjectId()
    },
    title: {
        type: String,
        require: true
    },
    creator: {
        type: ObjectId,
        ref: 'User',
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

const Media = mongoose.model('MediaSchema', MediaSchema);
module.exports = Media