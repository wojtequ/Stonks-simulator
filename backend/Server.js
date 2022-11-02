const express = require('express')
const app = express()

// config
const config = {
    appName: 'stonks',
    port: 3000
}

// source of static content
app.use(express.static('public'))

// main process
app.listen(config.port)