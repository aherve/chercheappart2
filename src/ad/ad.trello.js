'use strict'

import TrelloClient from 'node-trello'

export default function AdTrelloPlugin (schema) {
  schema.post('save', function (ad) {
    const trello = new TrelloClient(process.env.TRELLO_API_KEY, process.env.TRELLO_API_SECRET)
    trello.post(`/1/lists/${process.env.TRELLO_LIST_ID}/cards`, {
      name: `${ad.title} - ${ad.surface} - ${ad.price}`,
      desc: `${ad.description} \n ${ad.url}`,
    }, (err, card) => {
      console.log('adding picture url', ad.pictureUrl)
      trello.post(`/1/cards/${card.id}/attachments`, {
        url: ad.pictureUrl,
      }, (err, res) => {
        if (err) { console.log('ERROR', err) }
        console.log(`finished trello for card ${ad.slug}`)
      })
    })
  })
}
