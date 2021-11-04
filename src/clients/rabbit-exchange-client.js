const amqp = require('amqplib')

class RabbitExchangeClient {
  queue = ''
  connection = null
  channel = null
  url = null
  queueExclusive = true
  exchange = ''
  exchangeType = ''
  exchangeDurable = false
  exchangeCreated = false

  constructor (parameters) {
    const {
      url,
      queueExclusive,
      exchange,
      exchangeType,
      exchangeDurable,
      subscribeNoAck,
    } = parameters

    this.url = url
    this.queueExclusive = queueExclusive
    this.exchange = exchange
    this.exchangeType = exchangeType
    this.exchangeDurable = exchangeDurable
    this.subscribeNoAck = subscribeNoAck
  }

  _getConnection = async () => {
    if (this.connection === null) {
      this.connection = await amqp.connect(this.url)
    }

    return this.connection
  }

  _getChannel = async () => {
    if (this.connection === null) {
      await this._getConnection()
    }

    if (this.channel === null) {
      this.channel = await this.connection.createChannel()
    }

    return this.channel
  }

  _createExchange = async () => {
    if (this.channel === null) {
      await this._getChannel()
    }

    try {
      this.channel.assertExchange(this.exchange, this.exchangeType, {
        durable: this.exchangeDurable
      });
      
      this.exchangeCreated = true
    } catch (error) {
      throw error
    }
  }
}

class RabbitExchangePublishClient extends RabbitExchangeClient {
  constructor (parameters) {
    super(parameters)
  }
  
  publish = async (topic, payload) => {
    if (this.exchangeCreated != true) {
      await this._createExchange()
    }

    this.channel.publish(this.exchange, topic, Buffer.from(payload));    
    // console.log(" [x] Sent %s: '%s'", topic, payload);
  }
  
  closeConnection = async () => {
    if (this.connection) {
      return this.connection.close()
    }
    return false
  }
}

class RabbitExchangeSubscribeClient extends RabbitExchangeClient {
  constructor (parameters) {
    super(parameters)
  }
  
  subscribe = async (topics, cb) => {
    if (this.exchangeCreated != true) {
      await this._createExchange()
    }

    const { queue } = await this.channel.assertQueue('', {
      exclusive: this.queueExclusive
    })

    topics.forEach(topic => {
      this.channel.bindQueue(queue, this.exchange, topic)
    })

    this.channel.consume(queue, cb, {
      noAck: true
    })
  }
}

module.exports = {
  RabbitExchangePublishClient,
  RabbitExchangeSubscribeClient
}