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
      } else {
        if (queryParams.startTime) {
          mustClauses.push({
            range: {
              timestamp: {
                gte: queryParams.startTime,
              },
            },
          });
        }
  
        if (queryParams.endTime) {
          mustClauses.push({
            range: {
              timestamp: {
                lte: queryParams.endTime,
              },
            },
          });
        }
      }
  
      if (queryParams.timestamp) {
        mustClauses.push({
          term: { timestamp: queryParams.timestamp },
        });
      }
  
      // Use keyword match for the resourceId field
      if (queryParams.resourceId) {
        mustClauses.push({
          term: { "resourceId.keyword": queryParams.resourceId },
        });
      }
  
      // Use keyword match for the traceId field
      if (queryParams.traceId) {
        mustClauses.push({
          term: { "traceId.keyword": queryParams.traceId },
        });
      }
  
      // Use keyword match for the spanId field
      if (queryParams.spanId) {
        mustClauses.push({
          term: { "spanId.keyword": queryParams.spanId },
        });
      }
  
      Object.keys(queryParams).forEach((key) => {
        if (!["startTime", "endTime", "timestamp", "resourceId", "traceId", "spanId"].includes(key)) {
          if (queryParams[key] === "") {
            // If the value is an empty string, skip this condition
          } else {
            const keys = key.split('.');
            let query;
      
            if (keys.length > 1) {
              // Handle nested fields
              if (keys[0] === "metadata" && keys[1] === "parentResourceId") {
                // Use keyword match for nested parentResourceId
                query = {
                  nested: {
                    path: keys[0],
                    query: {
                      term: { [key]: queryParams[key] },
                    },
                  },
                };
              } else {
                query = {
                  nested: {
                    path: keys[0],
                    query: {
                      match: { [key]: queryParams[key] },
                    },
                  },
                };
              }
            } else {
              query = {
                match: { [key]: queryParams[key] },
              };
            }
      
            mustClauses.push(query);
          }
        }
      });
  
      const result = await esClient.search({
        index: "logs",
        size: 10000,
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
        size: 10000,
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
