
module.exports = {
  url: process.env.RABBIT_URL || "amqp://localhost",
  subscribeNoAck: process.env.RABBIT_NO_ACK === "true" ? true : false,
  exchange: process.env.RABBIT_EXCHANGE || null,
  exchangeType: process.env.RABBIT_EXCHANGE_TYPE || "fanout",
  queueExclusive: process.env.RABBIT_QUEUE_EXCLUSIVE === "true" ? true : false,
  exchangeDurable: process.env.RABBIT_EXCHANGE_DURABLE === "true" ? true : false,
  // topics: process.env.RABBIT_TOPICS || 'info'
}