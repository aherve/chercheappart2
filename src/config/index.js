'use strict'

const config = {
  foo: 'bar',
  db: {
    uri: process.env.MONGO_URI,
    options: {
      db: {
        safe: true,
      },
    },
  },
}

export default config
