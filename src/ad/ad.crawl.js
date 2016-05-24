'use strict'

import Ad from './ad.model'
import async from 'async'
import request from 'request'
import cheerio from 'cheerio'
import randomUa from 'random-ua'

export default class AdCrawler {

  /*
     @param postalCode Integer The postal code (ex: 75)
     @param maxPrice Integer Max price in euros
     @param minRooms Integer Min number of rooms
     @param minSurface Integer Min surface in squared meters
     @param page Integer Page to browse. Default to 1
     */
  constructor (params) {
    Object.assign(this, {params}, {
      randomTimeoutMultiplier: 30, // will browse pages with a delay of [0, 30]s
    })
  }

  searchAndSave (cb) {
    this.search((err, newAds) => {
      if (err) { return cb(err) }
      async.each(newAds, (ad, cb) => {
        ad.saveIfNotExists(cb)
      }, cb)
    })
  }

  search (cb) {
    console.log('getting page')
    this.getMaxPage((err, maxPage) => {
      if (err) { return cb(err) }
      console.log('got max pages = ', maxPage)
      const pages = Array.from(new Array(maxPage), (x, i) => i + 1)
      console.log('will browse pages ', pages)
      return async.map(pages, this.getPageAds.bind(this), (err, res) => {
        if (err) { return cb(err) }
        const flatResults = [].concat.apply([], res)
        console.log('search provided ', flatResults.length, ' results')
        return cb(err, flatResults)
      })
    })
  }

  getMaxPage (cb) {
    console.log('getting max page')
    request.get({
      headers: this.randomHeader(),
      url: `http://www.seloger.com/list.htm?idtt=2&idtypebien=1,2` +
      `&cp=${this.params.postalCode}&photo=15&tri=initial&pxmax=${this.params.maxPrice}` +
        `&nb_piecesmin=${this.params.minRooms}&surfacemin=${this.params.minSurface}&LISTING-LISTpg=2`},
        (err, res) => {
          console.log('got status', res.statusCode)
          if (err) { return cb(err) }
          const $ = cheerio.load(res.body)
          const maxPage = parseInt(
            last(
              $('.pagination_result_number')
              .first()
              .text()
              .trim()
              .split(' ')
            )
          )
          if (isNaN(maxPage)) {
            return cb('ERR: Could not determine the number of pages')
          }
          return cb(null, maxPage)
        }
               )
  }

  getPageAds (page , cb) {
    setTimeout(this.instantGetPageAds.bind(this, page, cb), Math.random() * 1000 * this.randomTimeoutMultiplier)
  }

  instantGetPageAds (page, cb) {
    const randomTimeout = this.tim
    console.log('browsing page number ', page)
    request.get({
      headers: this.randomHeader(),
      url: `http://www.seloger.com/list.htm?idtt=2&idtypebien=1,2` +
      `&cp=${this.params.postalCode}&photo=15&tri=initial&pxmax=${this.params.maxPrice}` +
      `&nb_piecesmin=${this.params.minRooms}&surfacemin=${this.params.minSurface}&LISTING-LISTpg=${page}`
    },
        (err, res) => {
          if (err) { return cb(err) }
          const $ = cheerio.load(res.body)
          const adsData = $('.listing').map((i, el) => {
            return Object.assign({}, {
              slug: el.attribs.id,
              url: $('.listing_infos > h2 > a', el).first().attr('href'),
              title: $('.listing_infos > h2 > a', el).first().text(),
              price: $('.listing_infos > .price > .amount', el).first().text(),
              description: $('.listing_infos > .description', el).first().text(),
              surface: $('ul.property_list > li', el).last().text(),
              pictureUrl: $('img.listing_photo', el).first().attr('src'),
            })
          }).get().map(data => new Ad(data))
          console.log(`page ${page} provided ${adsData.length} ads`)
          return cb(null, adsData)
        }
    )
  }

  randomHeader () {
    return {
      'User-Agent': randomUa.generate()
    }
  }

}

function last (ary) { return ary[ary.length - 1] }
