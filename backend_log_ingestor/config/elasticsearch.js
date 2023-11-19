const { Client } = require('@elastic/elasticsearch');
const fs = require('fs')

const esClient = new Client({ 
    node: 'https://elastic:HiZ=Q0l6KJTrFA94kRW+@localhost:9200',
    tls: {
        ca: fs.readFileSync('./http_ca.crt'),
        rejectUnauthorized: false
      },
})

module.exports = esClient;
