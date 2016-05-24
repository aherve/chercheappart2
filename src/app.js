'use strict'

import mongoose from 'mongoose'
import config from './config/'
import AdCrawler from './ad/ad.crawl'

mongoose.connect(config.db.uri, config.db.options)

new AdCrawler({
  postalCode: 93100,
  maxPrice: 450000,
  minRooms: 3,
  minSurface: 60,
}).searchAndSave((err) => {
  if (err) { return console.log(err) }
  console.log('successfully crawled')
})

