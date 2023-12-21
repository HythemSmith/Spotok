const express = require('express')
const router = express.Router()

const SiteController = require('../controllers/SiteController')


router.get('/signup', SiteController.getSignUp)
router.post('/signup', SiteController.postSignUp)
router.post('/login', SiteController.postLogin)
router.get('/homerandom', SiteController.getHomeRandom)
router.get('/homebase', SiteController.getHomeBase)
router.get(['/','/home'], SiteController.getHome)


module.exports = router