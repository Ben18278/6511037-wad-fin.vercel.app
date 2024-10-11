import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const CustomerDetail = () => {
  const { id } = useParams(); // Get customer ID from URL
  const [customer, setCustomer] = useState(null);

  useEffect(() => {
    const fetchCustomer = async () => {
      const response = await axios.get(`/api/customer/${id}`);
      setCustomer(response.data);
    };

    fetchCustomer();
  }, [id]);

  if (!customer) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h1>Customer Details</h1>
      <p><strong>Name:</strong> {customer.name}</p>
      <p><strong>Date of Birth:</strong> {customer.dateOfBirth}</p>
      <p><strong>Member Number:</strong> {customer.memberNumber}</p>
      <p><strong>Interest:</strong> {customer.interest}</p>
    </div>
  );
};

export default CustomerDetail;
