// import React, { useEffect, useState } from 'react'; 
// import { fetchCustomers } from '../services/customerService'; 
// import { sanitizeCustomerData } from '../helpers/sanitizeData'; 
// import Pagination from '../sharedcomponents/Pagination'; 
// import Filter from '../sharedcomponents/Filter'; 
// import Table from '../sharedcomponents/Table'; 
 
// const CustomerTable = () => { 
//   const [customers, setCustomers] = useState([]); 
//   const [totalCustomers, setTotalCustomers] = useState(0); 
//   const [page, setPage] = useState(1); 
//   const [pageSize, setPageSize] = useState(10); 
//   const [filters, setFilters] = useState({}); 
 
//   // Define the fields to include 
//   const fieldsToInclude = { 
//     id: true, 
//     firstName: true, 
//     lastName: true, 
//     email: true, 
//     isActive: true, 
//     totalBalance: true 
//   }; 
 
//   useEffect(() => { 
//     const loadCustomers = async () => { 
//       try { 
//         const data = await fetchCustomers({ page, pageSize, ...filters }); 
//         const sanitizedData = sanitizeCustomerData(data.customers, fieldsToInclude); 
//         setCustomers(sanitizedData); 
//         setTotalCustomers(data.total); 
//       } catch (error) { 
//         console.error(error.message); 
//       } 
//     }; 
 
//     loadCustomers(); 
//   }, [page, pageSize, filters]); 
 
//   return ( 
//     <div> 
//       <Filter setFilters={setFilters} /> 
//       <Table data={customers} fieldsToInclude={fieldsToInclude} /> 
//       <Pagination 
//         currentPage={page} 
//         totalItems={totalCustomers} 
//         itemsPerPage={pageSize} 
//         onPageChange={(newPage) => setPage(newPage)} 
//         onPageSizeChange={(newSize) => setPageSize(newSize)} 
//       /> 
//     </div> 
//   ); 
// }; 
 
// export default CustomerTable;

import React, { useState, useEffect } from 'react';
import { Pagination as BootstrapPagination, Modal, Button } from 'react-bootstrap';
import { fetchCustomers } from '../services/customerService';
import { sanitizeCustomerData } from '../helpers/sanitizeData';
import Filter from '../sharedcomponents/Filter';
import Table from '../sharedcomponents/Table';
import PageSize from '../sharedcomponents/PageSize';
import CustomerUpdateForm from './CustomerUpdateForm';

const CustomerTable = () => {
  const [customers, setCustomers] = useState([]);
  const [totalCustomers, setTotalCustomers] = useState(0);
  const [page, setPage] = useState(1); // 1-based index for UI
  const [pageSize, setPageSize] = useState(10);
  const [filters, setFilters] = useState({});
  const [selectedCustomer, setSelectedCustomer] = useState(null);
  const [showModal, setShowModal] = useState(false);

  const fieldsToInclude = {
    id: true,
    firstName: true,
    lastName: true,
    email: true,
    isActive: true,
    totalBalance: true
  };

  useEffect(() => {
    const loadCustomers = async () => {
      try {
        const data = await fetchCustomers({ page: page - 1, pageSize, ...filters });
        const sanitizedData = sanitizeCustomerData(data.customers, fieldsToInclude);
        setCustomers(sanitizedData);
        setTotalCustomers(data.totalItems);
      } catch (error) {
        console.error(error.message);
      }
    };

    loadCustomers();
  }, [page, pageSize, filters]);

  const handleSearchNameChange = (event) => {
    const firstName = event.target.value;
    setFilters(prevFilters => ({ ...prevFilters, firstName }));
    setPage(1); // Reset to first page on search
  };

  const handleUpdateClick = (customer) => {
    setSelectedCustomer(customer);
    setShowModal(true); // Show the modal
  };

  const handleCloseModal = () => {
    setSelectedCustomer(null);
    setShowModal(false);
  };

  return (
    <div>
      <Filter
        searchName={filters.firstName || ''}
        onSearchNameChange={handleSearchNameChange}
        pageSize={pageSize}
        onPageSizeChange={(newSize) => {
          setPageSize(newSize);
          setPage(1); // Reset to first page on page size change
        }}
      />
      <Table
        data={customers}
        fieldsToInclude={fieldsToInclude}
        onUpdateClick={handleUpdateClick} // Pass the function to show the update form
      />
      {/* Modal for updating customer */}
      <Modal show={showModal} onHide={handleCloseModal}>
        <Modal.Header closeButton>
          <Modal.Title>Update Customer</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {selectedCustomer && (
            <CustomerUpdateForm
              customer={selectedCustomer}
              onUpdate={(updatedCustomer) => {
                setCustomers(customers.map(customer =>
                  customer.id === updatedCustomer.id ? updatedCustomer : customer
                ));
                handleCloseModal();
              }}
              onClose={handleCloseModal}
            />
          )}
        </Modal.Body>
      </Modal>
      <div className="d-flex justify-content-between align-items-center mt-3">
        <PageSize
          pageSize={pageSize}
          onPageSizeChange={(newSize) => {
            setPageSize(newSize);
            setPage(1); // Reset to first page on page size change
          }}
        />
        <BootstrapPagination>
          {[...Array(Math.ceil(totalCustomers / pageSize)).keys()].map(number => (
            <BootstrapPagination.Item
              key={number + 1}
              active={number + 1 === page}
              onClick={() => setPage(number + 1)}
            >
              {number + 1}
            </BootstrapPagination.Item>
          ))}
        </BootstrapPagination>
      </div>
    </div>
  );
};

export default CustomerTable;