import React, { useEffect, useCallback } from "react";
import axios from "axios";
import { useResults } from "../ResultsContext";

const RightResults = () => {
  const { results, updateResults } = useResults();

  const fetchData = useCallback(async () => {
    try {
      // Fetch data from the API when the component mounts
      const response = await axios.get("http://localhost:3000/logs/search");
      updateResults(response.data); // Update the global results
      console.log("Data updated");
    } catch (error) {
      console.error("Error fetching logs:", error);
    }
  }, [updateResults]);

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div>
      <h2>Search Results</h2>
      <div
        className="right-results" style={{ maxHeight: '600px', overflowY: 'auto' }}
        >
        <div className="table-responsive">
        <table className="table">
          <thead>
            <tr>
              <th>Level</th>
              <th>Message</th>
              <th>Resource ID</th>
              <th>Timestamp</th>
              <th>Trace ID</th>
              <th>Span ID</th>
              <th>Parent Resource ID</th>
            </tr>
          </thead>
          <tbody>
            {results.map((log, index) => (
              <tr key={index}>
                <td>{log._source.level}</td>
                <td>{log._source.message}</td>
                <td>{log._source.resourceId}</td>
                <td>{log._source.timestamp}</td>
                <td>{log._source.traceId}</td>
                <td>{log._source.spanId}</td>
                <td>
                  {log._source.metadata &&
                    log._source.metadata.parentResourceId}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
                    </div>
      </div>
    </div>
  );
};

export default RightResults;
