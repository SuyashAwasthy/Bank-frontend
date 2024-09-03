import React from 'react';
import { Button } from 'react-bootstrap';

const Table = ({ data, onUpdate, sortField, sortOrder, onSort }) => {
  const handleSort = (field) => {
    let order = 'asc';
    if (sortField === field && sortOrder === 'asc') {
      order = 'desc';
    }
    onSort(field, order);
  };

  return (
    <table className="table table-striped">
      <thead>
        <tr>
          <th onClick={() => handleSort('id')}>ID</th>
          <th onClick={() => handleSort('firstName')}>First Name</th>
          <th onClick={() => handleSort('lastName')}>Last Name</th>
          <th onClick={() => handleSort('email')}>Email</th>
          <th onClick={() => handleSort('isActive')}>Active</th>
         {/* // <th onClick={() => handleSort('totalBalance')}>Total Balance</th> */}
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        {data.map((customer) => (
          <tr key={customer.id}>
            <td>{customer.id}</td>
            <td>{customer.firstName}</td>
            <td>{customer.lastName}</td>
            <td>{customer.email}</td>
            <td>{customer.isActive ? 'Yes' : 'No'}</td>
            {/* <td>{customer.totalBalance}</td> */}
            <td>
              <Button variant="warning" onClick={() => onUpdate(customer)}>
                Update
              </Button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default Table;