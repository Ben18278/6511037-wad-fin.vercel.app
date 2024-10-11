import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

const CustomerApp = () => {
  const [customers, setCustomers] = useState([]);
  const [newCustomer, setNewCustomer] = useState({ name: '', dateOfBirth: '', memberNumber: '', interest: '' });
  const [editCustomer, setEditCustomer] = useState(null);

  // Fetch all customers
  useEffect(() => {
    fetchCustomers();
  }, []);

  const fetchCustomers = async () => {
    const response = await axios.get('/api/customer');
    setCustomers(response.data);
  };

  // Add new customer
  const handleAddCustomer = async () => {
    await axios.post('/api/customer', newCustomer);
    setNewCustomer({ name: '', dateOfBirth: '', memberNumber: '', interest: '' });
    fetchCustomers(); // Refresh the list
  };

  // Delete customer
  const handleDeleteCustomer = async (id) => {
    await axios.delete(`/api/customer/${id}`);
    fetchCustomers();
  };

  // Edit customer
  const handleUpdateCustomer = async () => {
    await axios.put(`/api/customer/${editCustomer.id}`, editCustomer);
    setEditCustomer(null); // Clear the edit form
    fetchCustomers(); // Refresh the list
  };

  return (
    <div>
      <h1>Customer Management</h1>

      {/* List of customers */}
      <h2>All Customers</h2>
      <ul>
        {customers.map((customer) => (
          <li key={customer.id}>
            <Link to={`/customer/${customer.id}`}>{customer.name}</Link> {/* Navigate to detail page */}
            <button onClick={() => handleDeleteCustomer(customer.id)}>Delete</button>
            <button onClick={() => setEditCustomer(customer)}>Edit</button>
          </li>
        ))}
      </ul>

      {/* Add new customer */}
      <h2>Add Customer</h2>
      <form onSubmit={(e) => { e.preventDefault(); handleAddCustomer(); }}>
        <input
          type="text"
          placeholder="Name"
          value={newCustomer.name}
          onChange={(e) => setNewCustomer({ ...newCustomer, name: e.target.value })}
        />
        <input
          type="text"
          placeholder="Date of Birth"
          value={newCustomer.dateOfBirth}
          onChange={(e) => setNewCustomer({ ...newCustomer, dateOfBirth: e.target.value })}
        />
        <input
          type="number"
          placeholder="Member Number"
          value={newCustomer.memberNumber}
          onChange={(e) => setNewCustomer({ ...newCustomer, memberNumber: e.target.value })}
        />
        <input
          type="text"
          placeholder="Interest"
          value={newCustomer.interest}
          onChange={(e) => setNewCustomer({ ...newCustomer, interest: e.target.value })}
        />
        <button type="submit">Add Customer</button>
      </form>

      {/* Edit existing customer */}
      {editCustomer && (
        <div>
          <h2>Edit Customer</h2>
          <form onSubmit={(e) => { e.preventDefault(); handleUpdateCustomer(); }}>
            <input
              type="text"
              placeholder="Name"
              value={editCustomer.name}
              onChange={(e) => setEditCustomer({ ...editCustomer, name: e.target.value })}
            />
            <input
              type="text"
              placeholder="Date of Birth"
              value={editCustomer.dateOfBirth}
              onChange={(e) => setEditCustomer({ ...editCustomer, dateOfBirth: e.target.value })}
            />
            <input
              type="number"
              placeholder="Member Number"
              value={editCustomer.memberNumber}
              onChange={(e) => setEditCustomer({ ...editCustomer, memberNumber: e.target.value })}
            />
            <input
              type="text"
              placeholder="Interest"
              value={editCustomer.interest}
              onChange={(e) => setEditCustomer({ ...editCustomer, interest: e.target.value })}
            />
            <button type="submit">Update Customer</button>
          </form>
        </div>
      )}
    </div>
  );
};

export default CustomerApp;
