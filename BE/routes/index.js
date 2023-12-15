const siteRouter = require('./site')
const mediaRouter = require('./media')


function route(app) {
    app.use('/media', mediaRouter)
    app.get('/', (req, res) => {
        res.send('Hello World!')
      })
}

module.exports = route