const { RabbitDirectExchangeSubscribeClient } = require('./clients/rabbit-client')
const options = require('../options')

const doTheThing = async () => {
  const subscriber = new RabbitDirectExchangeSubscribeClient(options)
  const topics = ['info', 'warn', 'debug']
  
  const cb = msg => {
    console.log(' [%s] Received %s', msg.fields.routingKey, msg.content.toString())
  }

  subscriber.subscribe(topics, cb)
}

doTheThing()
