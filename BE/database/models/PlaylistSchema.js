const mongoose = require('mongoose')
const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;
const User = require('./UserSchema')
const Media = require('./MediaSchema')

const PlaylistSchema = new Schema ({
    title: {
        type: String,
        require: true
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
    media: {
        type: [{
            type: Schema.Types.ObjectId,
            ref: 'Media' // Reference the 'Media' model for the array
        }],
        default: []
    },
    coverURL:   {
        type: String,
        default: "https://drive.google.com/uc?id=1K49VBDzHmcY_8nEtJgZIVpwrd1H4s7cr",
        require: true
    }
}) 

const Playlist = mongoose.model('Playlist', PlaylistSchema,);
module.exports = Playlist