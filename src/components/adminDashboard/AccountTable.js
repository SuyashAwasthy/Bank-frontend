import React from 'react';
import { Table, Button } from 'react-bootstrap';

const AccountTable = ({ accounts, onEdit, onDelete }) => {
  return (
    <Table striped bordered hover>
      <thead>
        <tr>
          <th>ID</th>
          <th>Account Number</th>
          <th>Balance</th>
          <th>Customer ID</th>
          <th>Bank ID</th>
          <th>Status</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        {accounts.length > 0 ? (
          accounts.map((account) => (
            <tr key={account.id}>
              <td>{account.id}</td>
              <td>{account.accountNo || 'N/A'}</td>
              <td>{account.balance}</td>
              <td>{account.customerId}</td>
              <td>{account.bankId}</td>
              <td>{account.active ? 'Active' : 'Inactive'}</td>
              <td>
                {/* <Button variant="warning" onClick={() => onEdit(account)}>
                  Edit
                </Button>{' '} */}
                <Button variant="danger" onClick={() => onDelete(account.id)}>
                  Delete
                </Button>
              </td>
            </tr>
          ))
        ) : (
          <tr>
            <td colSpan="7">No accounts found.</td>
          </tr>
        )}
      </tbody>
    </Table>
  );
};

export default AccountTable;