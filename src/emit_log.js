const { RabbitDirectExchangePublishClient } = require('./clients/rabbit-client')
const options = require('../options')

const doTheThing = async () => {
  const message = process.argv.slice(2).join(' ') || 'info Hello world!'
  const publisher = new RabbitDirectExchangePublishClient(options)
  const data = message.split(' ')
  const topic = data[0]
  payload = data.splice(1).join(' ')
  const result = await publisher.publish(topic, payload)
  console.log(" [x] Sent '%s'", message)
  console.log('RESULT:', result)

  setTimeout(async function () {
    await publisher.closeConnection()
    process.exit(0)
  }, 500)
}

doTheThing()
