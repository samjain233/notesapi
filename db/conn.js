const { MongoClient } = require("mongodb");

const uri = process.env.MongoURI;

const client = new MongoClient(uri);

(async () => {
  await client.connect();
})();

module.exports = client;
