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
  new AdCrawler().crawl('http://www.seloger.com/list.htm?idtt=2&idtypebien=1,2&cp=75&tri=initial&pxmax=500000&nb_piecesmin=3&surfacemin=60', (err, crawled) => {
    if (err) { return res.status(500).send(err) }
    res.status(200).send({res: crawled})
  })
})

server.listen(9000, function () {
  console.log('booting server');
})
