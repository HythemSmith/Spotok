const express = require('express')
const router = express.Router()

const SiteController = require('../controllers/SiteController')


router.get('/signup', SiteController.getSignUp)
router.post('/signup', SiteController.postSignUp)
router.post('/login', SiteController.postLogin)
router.get(['/','/home'], SiteController.getHomeRandom)

module.exports = router