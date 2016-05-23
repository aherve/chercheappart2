'use strict'

import mongoose from 'mongoose'
import timestamps from 'mongoose-timestamps'

const Schema = mongoose.Schema

const AdSchema = new Schema({
  slug: String,
  url: String,
  title: String,
  price: String,
  description: String,
  surface: String,
  pictureUrl: String,
})

AdSchema.plugin(timestamps)

module.exports = mongoose.model('Ad', AdSchema)
