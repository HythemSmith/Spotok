const siteRouter = require('./site')
const mediaRouter = require('./media')


function route(app) {
    app.use('/media', mediaRouter)
    app.get('/home', siteRouter)
    app.get('/', siteRouter)
}

module.exports = route