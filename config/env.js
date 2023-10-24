const KAFKA_URL = process.env.KAFKA_URL || "";
const MONGO_URI = process.env.MONGO_URI || "";
const AMQP_URL = process.env.AMQP_URL || "";
const KAFKA_TOPIC = process.env.KAFKA_TOPIC || "";

console.log(KAFKA_URL, MONGO_URI, AMQP_URL, KAFKA_TOPIC)

module.exports = { KAFKA_URL, MONGO_URI, AMQP_URL, KAFKA_TOPIC }