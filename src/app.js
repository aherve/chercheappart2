'use strict'

import express from 'express'
import mongoose from 'mongoose'
import config from './config/'

// connect mongo
mongoose.connect(config.db.uri, config.db.options)

// start server
const app = express()
const server = require('http').createServer(app);

app.get('/', function (req, res) {
  res.status(200).send('hello, world !')
})

server.listen(9000, function () {
  console.log('booting server');
})
