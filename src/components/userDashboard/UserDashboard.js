// src/components/userDashboard/UserDashboard.js
import React, { useEffect, useState } from 'react';
import { fetchCustomerById } from '../services/customerService'; // Import correct function
import { getPassbook } from '../services/transactionService'; // Import correct function
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import 'bootstrap/dist/css/bootstrap.min.css';
import './UserDashboard.css';

const UserDashboard = () => {
  const [customer, setCustomer] = useState(null);
  const [transactions, setTransactions] = useState([]);
  const navigate = useNavigate();
  
  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem('token');
        if (!token) {
          navigate('/login');
          return;
        }

        // Fetch customer details
        const customerId = 7; // Replace with actual customer ID from token or user context
        const customerData = await fetchCustomerById(customerId);
        setCustomer(customerData);

        // Fetch transactions
        const transactionData = await getPassbook(customerId);
        setTransactions(transactionData);

      } catch (error) {
        console.error('Failed to fetch data:', error);
        toast.error('Failed to load dashboard data');
      }
    };

    fetchData();
  }, [navigate]);

  return (
    <div className="container">
      {customer && (
        <div className="card mt-3">
          <div className="card-body">
            <h4 className="card-title">Customer Details</h4>
            <p>ID: {customer.id}</p>
            <p>Name: {customer.name}</p>
            <p>Status: {customer.isActive ? 'Active' : 'Inactive'}</p>
          </div>
        </div>
      )}

      <div className="row mt-3">
        <div className="col-md-6">
          <div className="card">
            <div className="card-body">
              <h4 className="card-title">Transactions</h4>
              {transactions.length > 0 ? (
                <ul className="list-group">
                  {transactions.map(transaction => (
                    <li key={transaction.id} className="list-group-item">
                      {transaction.details}
                    </li>
                  ))}
                </ul>
              ) : (
                <p>No transactions found</p>
              )}
            </div>
          </div>
        </div>
        <div className="col-md-6">
          <div className="card">
            <div className="card-body">
              <h4 className="card-title">Actions</h4>
              {/* Add buttons or links for transaction, withdrawal, and deposit */}
              <button className="btn btn-primary">Withdraw</button>
              <button className="btn btn-secondary">Deposit</button>
              <button className="btn btn-info">Transaction History</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserDashboard;