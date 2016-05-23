'use strict'

import express from 'express'
import mongoose from 'mongoose'
import config from './config/'
import AdCrawler from './ad/ad.crawl'

// connect mongo
mongoose.connect(config.db.uri, config.db.options)

// start server
const app = express()
const server = require('http').createServer(app);

app.get('/', function (req, res) {
  new AdCrawler({
    postalCode: 75012,
    maxPrice: 500000,
    minRooms: 3,
    minSurface: 60,
    page: 1,
  }).searchAndSave((err, crawled) => {
    if (err) { return res.status(500).send(err) }
    console.log('crawled = ', crawled)
    res.status(200).send({res: crawled})
  })
})

server.listen(9000, function () {
  console.log('booting server');
})
