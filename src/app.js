'use strict'

import mongoose from 'mongoose'
import config from './config/'
import AdCrawler from './ad/ad.crawl'

mongoose.connect(config.db.uri, config.db.options)

new AdCrawler({
  postalCode: 75,
  maxPrice: 450000,
  minRooms: 3,
  minSurface: 70,
}).searchAndSave((err) => {
  if (err) { return console.log(err) }
  console.log('successfully crawled')
})

