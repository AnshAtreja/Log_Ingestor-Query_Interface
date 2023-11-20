import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useResults } from '../ResultsContext';

const LeftFilters = () => {
  const initialFilters = {
    level: '',
    message: '',
    resourceId: '',
    traceId: '',
    spanId: '',
    commit: '',
    // parentResourceId: '',
    startTime: '',
    endTime: ''
  };

  const [filters, setFilters] = useState(initialFilters);
  const [searchText, setSearchText] = useState('');
  const { updateResults } = useResults();

  useEffect(() => {
    setFilters(initialFilters);
    setSearchText('');
  }, [updateResults]); 

  const handleInputChange = (field, value) => {
    setFilters((prevFilters) => ({ ...prevFilters, [field]: value }));
  };

  const applyFilters = () => {
    const queryParams = new URLSearchParams({ ...filters, text: searchText }).toString();
    axios
      .get(`http://localhost:3000/logs/search?${queryParams}`)
      .then((response) => {
        updateResults(response.data);
      })
      .catch((error) => {
        console.error('Error applying filters:', error);
      });
  };

  const handleSearch = () => {
    axios
      .get(`http://localhost:3000/logs/fulltext?text=${searchText}`)
      .then((response) => {
        updateResults(response.data);
      })
      .catch((error) => {
        console.error('Error with full-text search:', error);
      });
  };

  const handleReset = () => {
    axios
      .get(`http://localhost:3000/logs/search`)
      .then((response) => {
        updateResults(response.data);
      })
      .catch((error) => {
        console.error('Error with filter reset:', error);
      });
  };

  return (
    <div className="left-filters">
  <h2>Filter Options</h2>
  <div className="form-group">
    <label htmlFor="level">Level:</label>
    <input
      type="text"
      id="level"
      className="form-control"
      value={filters.level}
      onChange={(e) => handleInputChange('level', e.target.value)}
    />
  </div>
  <div className="form-group">
    <label htmlFor="message">Message:</label>
    <input
      type="text"
      id="message"
      className="form-control"
      value={filters.message}
      onChange={(e) => handleInputChange('message', e.target.value)}
    />
  </div>
  <div className="form-group">
    <label htmlFor="resourceId">Resource ID:</label>
    <input
      type="text"
      id="resourceId"
      className="form-control"
      value={filters.resourceId}
      onChange={(e) => handleInputChange('resourceId', e.target.value)}
    />
  </div>
  <div className="form-group">
    <label htmlFor="traceId">Trace ID:</label>
    <input
      type="text"
      id="traceId"
      className="form-control"
      value={filters.traceId}
      onChange={(e) => handleInputChange('traceId', e.target.value)}
    />
  </div>
  <div className="form-group">
    <label htmlFor="spanId">Span ID:</label>
    <input
      type="text"
      id="spanId"
      className="form-control"
      value={filters.spanId}
      onChange={(e) => handleInputChange('spanId', e.target.value)}
    />
  </div>
  <div className="form-group">
    <label htmlFor="commit">Commit:</label>
    <input
      type="text"
      id="commit"
      className="form-control"
      value={filters.commit}
      onChange={(e) => handleInputChange('commit', e.target.value)}
    />
  </div>
  {/* <div className="form-group">
    <label htmlFor="parentResourceId">Parent Resource ID:</label>
    <input
      type="text"
      id="parentResourceId"
      className="form-control"
      value={filters.parentResourceId}
      onChange={(e) => handleInputChange('parentResourceId', e.target.value)}
    />
  </div> */}
  <div className="form-group">
    <label htmlFor="startTime">Start Time:</label>
    <input
      type="text"
      id="startTime"
      className="form-control"
      value={filters.startTime}
      onChange={(e) => handleInputChange('startTime', e.target.value)}
    />
  </div>
  <div className="form-group">
    <label htmlFor="endTime">End Time:</label>
    <input
      type="text"
      id="endTime"
      className="form-control"
      value={filters.endTime}
      onChange={(e) => handleInputChange('endTime', e.target.value)}
    />
  </div>
  <button onClick={applyFilters} className="btn btn-primary my-1">Apply Filters</button>

  <div className="form-group mt-3">
    <label htmlFor="searchText">Search Text:</label>
    <input
      type="text"
      id="searchText"
      className="form-control"
      value={searchText}
      onChange={(e) => setSearchText(e.target.value)}
    />
  </div>
  <button onClick={handleSearch} className="btn btn-primary mt-2">Search</button>
  <button onClick={handleReset} className="btn btn-secondary mt-2 mx-2">Reset</button>
</div>
  );
};

export default LeftFilters;
