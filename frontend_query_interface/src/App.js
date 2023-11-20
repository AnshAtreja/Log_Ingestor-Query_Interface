// App.jsx
import React from 'react';
import Header from './components/Header';
import LeftFilter from './components/LeftFilter';
import RightResults from './components/RightResults';

const App = () => {
  return (
    <div className="app">
      <Header />
      <div className="container">
        <div className="row">
          <div className="col-md-4">
            <LeftFilter/>
          </div>
          <div className="col-md-8">
            <RightResults/>
          </div>
        </div>
      </div>
    </div>
  );
};

export default App;
