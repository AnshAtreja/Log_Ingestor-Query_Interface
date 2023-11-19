const esClient = require("../config/elasticsearch");

const indexName = "logs";

class LogModel {
  static async createLog(log) {
    return await esClient.index({
      index: indexName,
      body: log,
    });
  }

  static async searchLogs(queryParams) {
    try {
      const mustClauses = [];
  
      if (queryParams.startTime && queryParams.endTime) {
        mustClauses.push({
          range: {
            timestamp: {
              gte: queryParams.startTime,
              lte: queryParams.endTime,
            },
          },
        });
      } else if (queryParams.timestamp) {
        mustClauses.push({
          term: { timestamp: queryParams.timestamp },
        });
      }
  
      Object.keys(queryParams).forEach((key) => {
        if (!["startTime", "endTime", "timestamp"].includes(key)) {
          if (queryParams[key] === "") {
            // If the value is an empty string, skip this condition
          } else {
            const [nestedField, nestedKey] = key.split('.');
            if (nestedField && nestedKey) {
              mustClauses.push({
                nested: {
                  path: nestedField,
                  query: {
                    match: { [`${nestedField}.${nestedKey}`]: queryParams[key] },
                  },
                },
              });
            } else {
              mustClauses.push({ match: { [key]: queryParams[key] } });
            }
          }
        }
      });
      
  
      const result = await esClient.search({
        index: "logs",
        body: {
          query: {
            bool: {
              must: mustClauses,
            },
          },
        },
      });
  
      return result.hits.hits;
    } catch (error) {
      console.error("Error in Elasticsearch search request:", error);
      throw error;
    }
  }

  static async fullTextSearch(searchText) {
    try {
      const result = await esClient.search({
        index: "logs",
        body: {
          query: {
            query_string: {
              query: `*${searchText}*`,
              fields: [
                "level",
                "message",
                "resourceId",
                "traceId",
                "spanId",
                "commit",
                "metadata.parentResourceId",
              ],
              default_operator: "AND",
            },
          },
        },
      });

      return result.hits.hits;
    } catch (error) {
      console.error("Error in Elasticsearch search request:", error);
      throw error;
    }
  }
}

module.exports = LogModel;
