const express = require('express')
const router = express.Router()

const mediaController = require('../controllers/MediaController')

router.get('/', mediaController.getHome)
router.post('/upload', mediaController.postUpload)

module.exports = router