
class SiteController {

    // [POST] home/signup
    getSignUp(req, res) {
        res.json({key: '9'})
    }

    postSignUp(req, res) {
        res.json({key: '10'})
    }
}

module.exports = new SiteController