// import React, { useEffect, useState } from 'react'; 
// import { fetchCustomers, fetchCustomerById, updateCustomer } from '../../services/customerService'; 
// import Table from '../../sharedcomponents/Table'; 
// import Filter from '../../sharedcomponents/Filter'; 
// import CustomerUpdateForm from './CustomerUpdateForm'; 
// import Pagination from '../../sharedcomponents/Pagination'; 

// const AdminDashboard = () => { 
  
//   const [customers, setCustomers] = useState([]); 
//   const [loading, setLoading] = useState(true); 
//   const [error, setError] = useState(null); 
//   const [selectedCustomer, setSelectedCustomer] = useState(null); 
//   const [searchId, setSearchId] = useState(''); 
 
//   const [currentPage, setCurrentPage] = useState(1);
//   const [customersPerPage] = useState(10); // Number of customers per page
  
//   // Calculate the index of the last and first customer for the current page
//   const indexOfLastCustomer = currentPage * customersPerPage;
//   const indexOfFirstCustomer = indexOfLastCustomer - customersPerPage;
//   const currentCustomers = customers.slice(indexOfFirstCustomer, indexOfLastCustomer);
  
//   // Function to handle page changes
//   const handlePageChange = (page) => {
//     setCurrentPage(page);
//   };
  

//   useEffect(() => { 
//     const loadCustomers = async () => { 
//       try { 
//         const data = await fetchCustomers(); 
//         setCustomers(data); 
//       } catch (error) { 
//         setError(error); 
//       } finally { 
//         setLoading(false); 
//       } 
//     }; 
 
//     // Load customers initially 
//     loadCustomers(); 
//   }, []); 
 
//   const handleSearchIdChange = async (e) => { 
//     const id = e.target.value; 
//     setSearchId(id); 
 
//     if (id) { 
//       try { 
//         const customer = await fetchCustomerById(id); 
//         setCustomers([customer]); // Display only the searched customer 
//       } catch (error) { 
//         setError(error); 
//         setCustomers([]); // Clear the customer list if search fails 
//       } 
//     } else { 
//       // Reload all customers if search is cleared 
//       const loadCustomers = async () => { 
//         try { 
//           const data = await fetchCustomers(); 
//           setCustomers(data); 
//         } catch (error) { 
//           setError(error); 
//         } 
//       }; 
//       loadCustomers(); 
//     } 
//   }; 
 
//   const handleUpdateCustomer = async (customerData) => { 
//     try { 
//       await updateCustomer(customerData.id, customerData); 
//       setCustomers((prevCustomers) => 
//         prevCustomers.map((customer) => 
//           customer.id === customerData.id ? customerData : customer 
//         ) 
//       ); 
//     } catch (error) { 
//       setError(error); 
//     } 
//   }; 
 
//   if (loading) return <div>Loading...</div>; 
//   if (error) return <div>Error loading customers: {error.message}</div>; 
 
//   return ( 
//     <div className="container"> 
//       <h1 className="text-center">Admin Dashboard</h1> {/* Centered header */} 
//       <div className="mb-3"> 
//         <input 
//           type="text" 
//           value={searchId} 
//           onChange={handleSearchIdChange} 
//           placeholder="Search by ID" 
//           className="form-control me-2" 
//           style={{ maxWidth: '200px' }} 
//         /> 
//       </div> 
//       <Filter /> 
//       {currentCustomers && currentCustomers.length > 0 ? (
//   <Table
//     data={currentCustomers}
//     onUpdate={(customer) => setSelectedCustomer(customer)}
//   />
// ) : (
//   <div>No customers found</div>
// )}

// <Pagination
//   currentPage={currentPage}
//   totalPages={Math.ceil(customers.length / customersPerPage)}
//   onPageChange={handlePageChange}
// />

//       {selectedCustomer && ( 
//         <CustomerUpdateForm 
//           customer={selectedCustomer} 
//           onUpdate={handleUpdateCustomer} 
//           onClose={() => setSelectedCustomer(null)} 
//         /> 
//       )} 
//     </div> 
//   ); 
// }; 
 
// export default AdminDashboard;

// import React, { useEffect, useState } from 'react';
// import { fetchCustomers, fetchCustomerById, updateCustomer } from '../../services/customerService';
// import Table from '../../sharedcomponents/Table';
// import Filter from '../../sharedcomponents/Filter';
// import CustomerUpdateForm from './CustomerUpdateForm';
// import Pagination from '../../sharedcomponents/Pagination';

// const AdminDashboard = () => {
//   const [customers, setCustomers] = useState([]);
//   const [filteredCustomers, setFilteredCustomers] = useState([]); // To store search results separately
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const [selectedCustomer, setSelectedCustomer] = useState(null);
//   const [searchId, setSearchId] = useState('');
//   const [currentPage, setCurrentPage] = useState(1);
//   const [customersPerPage] = useState(10); // Number of customers per page

//   useEffect(() => {
//     const loadCustomers = async () => {
//       try {
//         const data = await fetchCustomers();
//         setCustomers(data);
//         setFilteredCustomers(data); // Initially, filteredCustomers is the full list
//       } catch (error) {
//         setError(error);
//       } finally {
//         setLoading(false);
//       }
//     };

//     // Load customers initially
//     loadCustomers();
//   }, []);

//   const handleSearchIdChange = async (e) => {
//     const id = e.target.value;
//     setSearchId(id);

//     if (id) {
//       try {
//         const customer = await fetchCustomerById(id);
//         setFilteredCustomers(customer ? [customer] : []); // Display only the searched customer
//       } catch (error) {
//         setError(error);
//         setFilteredCustomers([]); // Clear the customer list if search fails
//       }
//     } else {
//       // Reset to the full customer list if the search input is cleared
//       setFilteredCustomers(customers);
//     }
//     setCurrentPage(1); // Reset to the first page when search is performed
//   };

//   const handleUpdateCustomer = async (customerData) => {
//     try {
//       await updateCustomer(customerData.id, customerData);
//       setCustomers((prevCustomers) =>
//         prevCustomers.map((customer) =>
//           customer.id === customerData.id ? customerData : customer
//         )
//       );
//       setFilteredCustomers((prevCustomers) =>
//         prevCustomers.map((customer) =>
//           customer.id === customerData.id ? customerData : customer
//         )
//       );
//     } catch (error) {
//       setError(error);
//     }
//   };

//   // Pagination logic for filteredCustomers
//   const indexOfLastCustomer = currentPage * customersPerPage;
//   const indexOfFirstCustomer = indexOfLastCustomer - customersPerPage;
//   const currentCustomers = filteredCustomers.slice(indexOfFirstCustomer, indexOfLastCustomer);

//   // Function to handle page changes
//   const handlePageChange = (page) => {
//     setCurrentPage(page);
//   };

//   if (loading) return <div>Loading...</div>;
//   if (error) return <div>Error loading customers: {error.message}</div>;

//   return (
//     <div className="container">
//       <h1 className="text-center">Admin Dashboard</h1> {/* Centered header */}
//       <div className="mb-3">
//         <input
//           type="text"
//           value={searchId}
//           onChange={handleSearchIdChange}
//           placeholder="Search by ID"
//           className="form-control me-2"
//           style={{ maxWidth: '200px' }}
//         />
//       </div>
//       <Filter />
//       {currentCustomers && currentCustomers.length > 0 ? (
//         <Table
//           data={currentCustomers}
//           onUpdate={(customer) => setSelectedCustomer(customer)}
//         />
//       ) : (
//         <div>No customers found</div>
//       )}

//       <Pagination
//         currentPage={currentPage}
//         totalPages={Math.ceil(filteredCustomers.length / customersPerPage)}
//         onPageChange={handlePageChange}
//       />

//       {selectedCustomer && (
//         <CustomerUpdateForm
//           customer={selectedCustomer}
//           onUpdate={handleUpdateCustomer}
//           onClose={() => setSelectedCustomer(null)}
//         />
//       )}
//     </div>
//   );
// };

// export default AdminDashboard;

import React, { useEffect, useState, useCallback } from 'react';
import { fetchCustomers, fetchCustomerById, updateCustomer } from '../services/customerService';
import Table from '../sharedcomponents/Table';
import Filter from '../sharedcomponents/Filter';
import CustomerUpdateForm from './CustomerUpdateForm';
import PageSize from '../sharedcomponents/PageSize';
import Pagination from '../sharedcomponents/CustomPagination';
import debounce from 'lodash.debounce';
import { ToastContainer, toast } from 'react-toastify';
import { Modal, Spinner } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'react-toastify/dist/ReactToastify.css';

const AdminDashboard = () => {
  const [customers, setCustomers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedCustomer, setSelectedCustomer] = useState(null);
  const [searchId, setSearchId] = useState('');
  const [searchName, setSearchName] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [totalCustomers, setTotalCustomers] = useState(0);
  const [sortField, setSortField] = useState('id');
  const [sortOrder, setSortOrder] = useState('asc');
  const [showModal, setShowModal] = useState(false);

  const debouncedLoadCustomers = useCallback(
    debounce(() => {
      loadCustomers();
    }, 300),
    [searchName, currentPage, pageSize, sortField, sortOrder]
  );

  const loadCustomers = async () => {
    try {
      setLoading(true);
      setError(null); // Clear any previous errors
      const data = await fetchCustomers({
        page: currentPage - 1,
        pageSize,
        sortField,
        sortOrder,
        firstName: searchName,
      });
      setCustomers(data.customers);
      setTotalCustomers(data.totalItems);
    } catch (error) {
      setError('Error loading customers.');
      toast.error('Failed to load customers.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    debouncedLoadCustomers();
    return () => {
      debouncedLoadCustomers.cancel();
    };
  }, [debouncedLoadCustomers]);

  const handleSearchIdChange = async (e) => {
    const id = e.target.value;
    setSearchId(id);

    if (id) {
      try {
        setLoading(true);
        const customer = await fetchCustomerById(id);
        setCustomers([customer]);
        setTotalCustomers(1);
      } catch (error) {
        setError('Error fetching customer by ID.');
        setCustomers([]);
        setTotalCustomers(0);
        toast.error('Customer not found.');
      } finally {
        setLoading(false);
      }
    } else {
      loadCustomers();
    }
  };

  const handleSearchNameChange = (e) => {
    setSearchName(e.target.value);
  };

  const handleUpdateCustomer = async (customerData) => {
    try {
      await updateCustomer(customerData.id, customerData);
      setCustomers((prevCustomers) =>
        prevCustomers.map((customer) =>
          customer.id === customerData.id ? customerData : customer
        )
      );
      toast.success('Customer updated successfully!');
      setShowModal(false);
    } catch (error) {
      if (error.response && error.response.status === 401) {
        toast.error('Unauthorized: Please log in as an admin.');
      } else if (error.response && error.response.status === 403) {
        toast.error('Forbidden: You do not have permission to update this customer.');
      } else {
        toast.error('Failed to update customer');
      }
      setError(error);
    }
  };
  
  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const handlePageSizeChange = (newSize) => {
    setPageSize(newSize);
    setCurrentPage(1);
  };

  const handleSortChange = (field, order) => {
    setSortField(field);
    setSortOrder(order);
  };

  const handleOpenModal = (customer) => {
    setSelectedCustomer(customer);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setSelectedCustomer(null);
  };

  if (loading) return <div className="text-center"><Spinner animation="border" /></div>;
  if (error) return <div className="alert alert-danger">{error}</div>;

  return (
    <div className="container">
      <h1 className="text-center">Banking Application</h1>
      <div className="mb-4">
        <div className="row">
          <div className="col-md-4 mb-3">
            <input
              type="text"
              value={searchId}
              onChange={handleSearchIdChange}
              placeholder="Search by ID"
              className="form-control"
            />
          </div>
          <div className="col-md-8">
            <Filter 
              searchName={searchName} 
              onSearchNameChange={handleSearchNameChange} 
              pageSize={pageSize}
              onPageSizeChange={handlePageSizeChange}
            />
          </div>
        </div>
      </div>
      {customers && customers.length > 0 ? (
        <Table
          data={customers}
          onUpdate={handleOpenModal}
          sortField={sortField}
          sortOrder={sortOrder}
          onSort={handleSortChange}
        />
      ) : (
        <div>No customers found</div>
      )}
      <Modal show={showModal} onHide={handleCloseModal}>
        <Modal.Header closeButton>
          <Modal.Title>Update Customer</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {selectedCustomer && (
            <CustomerUpdateForm
              customerId={selectedCustomer.id}
              onUpdate={handleUpdateCustomer}
              onClose={handleCloseModal}
            />
          )}
        </Modal.Body>
      </Modal>
      <div className="d-flex justify-content-between align-items-center mt-3">
        <PageSize
          pageSize={pageSize}
          onPageSizeChange={handlePageSizeChange}
        />
        <Pagination
          currentPage={currentPage}
          totalItems={totalCustomers}
          itemsPerPage={pageSize}
          onPageChange={handlePageChange}
        />
      </div>
      <ToastContainer />
    </div>
  );
};

export default AdminDashboard;