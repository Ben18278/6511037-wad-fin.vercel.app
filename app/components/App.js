import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import CustomerApp from './CustomerApp';
import CustomerDetail from './CustomerDetail'; // Import the CustomerDetail component

function App() {
  return (
    <Router>
      <div>
        <Routes>
          <Route path="/" element={<CustomerApp />} />
          <Route path="/customer/:id" element={<CustomerDetail />} /> {/* Route for customer detail */}
        </Routes>
      </div>
    </Router>
  );
}

export default App;
