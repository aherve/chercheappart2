'use strict'

import mongoose from 'mongoose'
import config from './config/'
import AdCrawler from './ad/ad.crawl'

mongoose.connect(config.db.uri, config.db.options)

new AdCrawler({
  postalCode: 75012,
  maxPrice: 500000,
  minRooms: 3,
  minSurface: 60,
  page: 1,
}).searchAndSave((err, crawled) => {
  if (err) { return console.error(err) }
  console.log('crawled = ', crawled)
  return process.exit()
})
