const express = require('express')
const router = express.Router()

const mediaController = require('../controllers/MediaController')

router.post('/upload', mediaController.postUpload)