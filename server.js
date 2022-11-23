const app = require('./app')

const PORT = process.env.PORT || 3005

const server = app.listen(PORT, () => console.log(`server up and running on port ${PORT}`))

server.on('error', (err) => console.error(err))