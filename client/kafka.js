const { Kafka } = require("kafkajs");

const { KAFKA_URL } = require('../config/env')

const kafkaClient = new Kafka({
  clientId: "food-siam-si-producer",
  brokers: [KAFKA_URL],
  retry: undefined,
  connectionTimeout: 60000,
})

const producer = kafkaClient.producer()

module.exports = { producer }