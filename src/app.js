'use strict'

import mongoose from 'mongoose'
import config from './config/'
import AdCrawler from './ad/ad.crawl'

mongoose.connect(config.db.uri, config.db.options)

const cps = [75, 93100]

cps.forEach(function (cp) {

  new AdCrawler({
    postalCode: cp,
    maxPrice: 470000,
    minRooms: 3,
    minSurface: 70,
  }).searchAndSave((err) => {
    if (err) { return console.log(err) }
    console.log('successfully crawled')
  })

})
