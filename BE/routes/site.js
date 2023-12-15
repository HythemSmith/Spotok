const express = require('express')
const router = express.Router()

const SiteController = require('../controllers/SiteController')

router.get('/', SiteController.getHome)
router.get('/signup', SiteController.getSignUp)
router.post('/signup', SiteController.postSignUp)
router.get('/login',)
router.post('/login',)
module.exports = router