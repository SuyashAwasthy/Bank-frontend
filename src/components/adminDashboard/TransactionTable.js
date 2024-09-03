import React from 'react';
import { Table } from 'react-bootstrap';
import { format } from 'date-fns'; // Import date-fns for date formatting

const TransactionTable = ({ transactions = [] }) => {
  console.log("Transactions in TransactionTable:", transactions); // Debugging: log the transactions received

  // Format date for display
  const formatDate = (dateString) => {
    try {
      return format(new Date(dateString), 'yyyy-MM-dd HH:mm:ss'); // Adjust format as needed
    } catch (e) {
      return dateString; // Fallback if date parsing fails
    }
  };

  return (
    <Table striped bordered hover>
      <thead>
        <tr>
          <th>ID</th>
          <th>From Account ID</th>
          <th>To Account ID</th>
          <th>Transaction Type</th>
          <th>Amount</th>
          <th>Transaction Date</th>
          <th>Status</th>
        </tr>
      </thead>
      <tbody>
        {transactions.length > 0 ? (
          transactions.map((transaction) => (
            <tr key={transaction.id}>
              <td>{transaction.id || 'N/A'}</td>
              <td>{transaction.fromAccountId || 'N/A'}</td>
              <td>{transaction.toAccountId || 'N/A'}</td>
              <td>{transaction.transactionType || 'N/A'}</td>
              <td>{transaction.amount || '0.00'}</td>
              <td>{formatDate(transaction.transactionDate)}</td>
              <td>{transaction.active ? 'Active' : 'Inactive'}</td>
            </tr>
          ))
        ) : (
          <tr>
            <td colSpan="7">No transactions found.</td>
          </tr>
        )}
      </tbody>
    </Table>
  );
};

export default TransactionTable;