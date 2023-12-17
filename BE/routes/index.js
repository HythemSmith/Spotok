const siteRouter = require('./site')
const mediaRouter = require('./media')


function route(app) {
    app.use('/media', mediaRouter)
    app.use('/home', siteRouter)
    app.use('/', siteRouter)
}

module.exports = route