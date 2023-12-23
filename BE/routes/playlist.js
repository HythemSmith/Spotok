const express = require('express')
const router = express.Router()

const PlaylistController = require('../controllers/PlaylistController')


router.put('/:id', PlaylistController.addSongToPlaylist)
router.post('/', PlaylistController.createPlaylist)



module.exports = router