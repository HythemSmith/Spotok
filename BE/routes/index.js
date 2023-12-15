const siteRouter = require('./site')
const mediaRouter = require('./media')


function route(app) {
    app.use('/media', mediaRouter)
    app.use('/', (req, res) => { res.JSON({key: '9'})})
}

module.exports = route