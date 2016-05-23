'use strict'

import mongoose from 'mongoose'
import timestamps from 'mongoose-timestamps'

const Schema = mongoose.Schema

const AdSchema = new Schema({
  title: {type: String, default: 'tagada'},
})

AdSchema.plugin(timestamps)

module.exports = mongoose.model('Ad', AdSchema)
