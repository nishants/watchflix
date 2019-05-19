const { Client } = require('@elastic/elasticsearch');
const {elasticServerNode} = require('./config');

const client = new Client({
  node: elasticServerNode,
  log: 'trace'
});

module.exports = client;
