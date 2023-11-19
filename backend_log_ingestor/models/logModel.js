const esClient = require('../config/elasticsearch');

const indexName = 'logs';

class LogModel {
  static async createLog(log) {
    return await esClient.index({
      index: indexName,
      body: log,
    });
  }

static async searchLogs(queryParams){
  try{
    const mustClauses = [];

    if (queryParams.startTime && queryParams.endTime) {
      mustClauses.push({
        range: {
          timestamp: {
            gte: queryParams.startTime, // Greater than or equal to start time
            lte: queryParams.endTime,   // Less than or equal to end time
          },
        },
      });
    } else if (queryParams.timestamp) {
      // If only one timestamp is provided, treat it as an equality filter
      mustClauses.push({
        term: { timestamp: queryParams.timestamp },
      });
    }

    Object.keys(queryParams).forEach(key => {
      if (!['startTime', 'endTime', 'timestamp'].includes(key)) {
        mustClauses.push({ match: { [key]: queryParams[key] } });
      }
    });
    // console.log(mustClauses)
      const result = await esClient.search({
        index: 'logs',
        body:{
          query: {
            bool: {
              must: mustClauses
            }
          }
        }
      })
      return result.hits.hits
  }
  catch(error){
    console.error('Error in Elasticsearch search request:', error);
    throw error; 
  }
}

static async fullTextSearch(searchText) {
  try {
    // const result = await esClient.search({
    //   index: 'logs',
    //   body: {
    //     query: {
    //       wildcard: {
    //         message: `*${searchText}*`,
    //       },
    //     },
    //   },
    // });

    // const { text, ...restParams } = queryParams;

    const result = await esClient.search({
      index: 'logs',
      body: {
        query: {
          query_string: {
            query: `*${searchText}*`,
            fields: ['level', 'message', 'resourceId', 'traceId', 'spanId', 'commit', 'metadata.parentResourceId'],
            default_operator: 'AND', // You can adjust this based on your requirements
          },
        },
      },
    });

    return result.hits.hits;
  } catch (error) {
    console.error('Error in Elasticsearch search request:', error);
    throw error;
  }
}



}

module.exports = LogModel;
