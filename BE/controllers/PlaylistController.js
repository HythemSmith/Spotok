const PlaylistSchame = require('../database/models/PlaylistSchema')
const MediaSchema = require('../database/models/MediaSchema')
const UserSchema = require('../database/models/UserSchema')
const mongoose = require('mongoose');

class PlaylistController {
    // [GET] playlist
    getPlaylist = async (req, res) => {
        PlaylistSchame.find({})
            .sort({ createdAt: -1 }) // Assuming 'createdAt' is your timestamp field
            .limit(6)
            .select('_id title media coverURL')
            .exec()
                .then(documents => {
                    res.send(documents)
                  })
                  .catch(err => {
                    console.error(err);
                    // Handle error
                  });
    }
    // [GET] playlist/:id
    getSpecificPlaylist = async (req, res) => {
        try {
            const playlistId = req.params.id;
            const playlist = await PlaylistSchame
            .findById(playlistId)
            .populate({
                path: 'media',
                select: 'title storageURL coverURL creator',
                populate: {
                    path: 'creator',
                    select: 'userName -_id' // Select the 'name' field of the creator
                }
            });
            if (!playlist) {
              return res.status(404).json({ message: 'Playlist not found' });
            }
            // Extract specific fields from each media item
            const modifiedPlaylist = {
                media: playlist.media.map(({ title, storageURL, coverURL, creator }) => ({
                    title,
                    storageURL,
                    image: coverURL,
                    creator: creator.userName // Access the name of the creator
                }))
            };
        
            res.json(modifiedPlaylist);
        } catch (error) {
        res.status(500).json({ message: 'Internal server error' });
        }
    }
    // [POST] playlist 
    createPlaylist = async (req, res) => {
        console.log(req.body)
        const { title, creator, mediaType } = req.body
        try {
            await PlaylistSchame.create({
                title,
                creator,
                mediaType
            })
            res.status(200).send("Create Playlist successful")
        } catch (error) {
            console.log(error)
            res.status(500).send("Failed to create Playlist successful")
        }
    }
    // [PUT] playlist/:id
    addSongToPlaylist = async (req, res) => {
        // Get media _id
        const { mediaIDs } = req.body
        let mediaObjectIds = []
        mediaIDs.forEach((item) =>{
            const objectId = new mongoose.Types.ObjectId(item);
            mediaObjectIds.push(objectId)
        })
        // Get Playlist _id
        const playlistID = req.params.id
        PlaylistSchame.findById(playlistID)
        .then(async playlist => {
            if (!playlist) {
                console.log('Playlist not found');
                res.status(404).send({ message: "Playlist not found"});
            }
            // Filter the media IDs that are not already in the playlist
            const mediaIDsNotInPlaylist = mediaObjectIds.filter(mediaID => !playlist.media.includes(mediaID));

            // If all mediaIDs are already in the playlist, return a message
            if (mediaIDsNotInPlaylist.length === 0) {
                return res.status(200).send({ message: 'All songs are already in the playlist' });
            }
            // Add not in playlist ones
            mediaIDsNotInPlaylist.forEach(item =>{
                playlist.media.push(item)
            })
            // Save the updated playlist
            await playlist.save();
            res.status(200).send({ message: "Adding songs successfully"})
        })
        .catch(err => {
            // Handle any errors
            console.error(err);
            res.status(500).send({message: "Server Error"})
        });
    }
}

module.exports = new PlaylistController