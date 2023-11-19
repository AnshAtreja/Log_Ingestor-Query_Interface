// ResultsContext.js
import { createContext, useContext, useState } from 'react';

const ResultsContext = createContext();

export const ResultsProvider = ({ children }) => {
  const [results, setResults] = useState([]);

  const updateResults = (newResults) => {
    setResults(newResults);
  };

  return (
    <ResultsContext.Provider value={{ results, updateResults }}>
      {children}
    </ResultsContext.Provider>
  );
};

export const useResults = () => {
  return useContext(ResultsContext);
};
