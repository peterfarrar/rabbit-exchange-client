const { RabbitExchangeSubscribeClient } = require('./clients/rabbit-exchange-client')
const options = require('../options')

const doTheThing = async () => {
  const subscriber = new RabbitExchangeSubscribeClient(options)
  const topics = ["info.*", 'warn.#', 'debug.#']
  
  const cb = msg => {
    console.log(' [%s] Received %s', msg.fields.routingKey, msg.content.toString())
  }

  subscriber.subscribe(topics, cb)
}

doTheThing()
