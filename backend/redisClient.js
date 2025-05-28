const redis = require("redis");

const client = redis.createClient();

client
  .connect()
  .then(() => {
    console.log("redis client connected");
  })
  .catch(console.error);

module.exports = client;
