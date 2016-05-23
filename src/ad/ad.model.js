'use strict'

import mongoose from 'mongoose'
import timestamps from 'mongoose-timestamps'

const Schema = mongoose.Schema

const AdSchema = new Schema({
  slug: {type: String, index: {unique: true}},
  url: String,
  title: String,
  price: String,
  description: String,
  surface: String,
  pictureUrl: String,
})

AdSchema.post('save', function (doc) {
  console.log('created doc number ', doc.slug)
})

AdSchema.methods.saveIfNotExists = function (cb) {
  mongoose.connection.collections.ads.findOne({
    slug: this.slug,
  }, (err, bro) => {
    if (err) { return cb(err) }
    if (bro) {
      return cb(null, null)
    } else {
      return this.save(cb)
    }
  })
}

AdSchema.plugin(timestamps)

module.exports = mongoose.model('Ad', AdSchema)
