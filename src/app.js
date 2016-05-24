'use strict'

import mongoose from 'mongoose'
import config from './config/'
import AdCrawler from './ad/ad.crawl'
import Ad from './ad/ad.model'
import TrelloClient from 'node-trello'

mongoose.connect(config.db.uri, config.db.options)

new AdCrawler({
  postalCode: 75,
  maxPrice: 400000,
  minRooms: 3,
  minSurface: 65,
}).searchAndSave((err) => {
  if (err) { return console.log(err) }
  console.log('successfully crawled')
})
