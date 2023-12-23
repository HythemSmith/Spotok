const siteRouter = require('./site')
const mediaRouter = require('./media')
const playlistRouter = require('./playlist')


function route(app) {
    app.use('/media', mediaRouter)
    app.use('/home', siteRouter)
    app.use('/playlist', playlistRouter)
    app.use('/', siteRouter)
}

module.exports = route