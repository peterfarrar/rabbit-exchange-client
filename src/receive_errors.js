const { RabbitExchangeSubscribeClient } = require('./clients/rabbit-exchange-client')
const options = require('../options')

const doTheThing = async () => {
  const cb = msg => {
    console.log(' [%s] Received %s', msg.fields.routingKey, msg.content.toString())
  }

  const subscriber = new RabbitExchangeSubscribeClient(options)

  const topics = ['warn.*', 'error.#', 'critical.#']
  subscriber.subscribe(topics, cb)
}

doTheThing()
