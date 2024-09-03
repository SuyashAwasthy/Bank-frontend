import React, { useEffect, useState, useCallback } from 'react';
import { fetchCustomers, fetchCustomerById, updateCustomer, createCustomer } from '../services/customerService';
import Table from '../sharedcomponents/Table';
import Filter from '../sharedcomponents/Filter';
import CustomerUpdateForm from './CustomerUpdateForm';
import CustomerCreateForm from './CustomerCreateForm'; 
import PageSize from '../sharedcomponents/PageSize';
import Pagination from '../sharedcomponents/CustomPagination';
import debounce from 'lodash.debounce';
import { ToastContainer, toast } from 'react-toastify';
import CustomModal from '../sharedcomponents/CustomModal';
import { Spinner } from 'react-bootstrap';
import { useNavigate, useLocation } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'react-toastify/dist/ReactToastify.css';

const CustomerManagement = () => {
  const [customers, setCustomers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedCustomer, setSelectedCustomer] = useState(null);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [showUpdateModal, setShowUpdateModal] = useState(false);
  const [searchId, setSearchId] = useState('');
  const [searchName, setSearchName] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [totalCustomers, setTotalCustomers] = useState(0);
  const [sortField, setSortField] = useState('id');
  const [sortOrder, setSortOrder] = useState('asc');

  const navigate = useNavigate(); 
  const location = useLocation();

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const name = params.get('name') || '';
    const id = params.get('id') || '';
    const page = Number(params.get('page')) || 1;
    const size = Number(params.get('size')) || 10;
    const sortField = params.get('sortField') || 'id';
    const sortOrder = params.get('sortOrder') || 'asc';

    setSearchName(name);
    setSearchId(id);
    setCurrentPage(page);
    setPageSize(size);
    setSortField(sortField);
    setSortOrder(sortOrder);
  }, [location.search]);

  const debouncedLoadCustomers = useCallback(
    debounce(() => {
      loadCustomers();
    }, 300),
    [searchName, searchId, currentPage, pageSize, sortField, sortOrder]
  );

  const loadCustomers = async () => {
    try {
      setLoading(true);
      setError(null);
      if (searchId) {
        // Fetch a single customer by ID if searchId is provided
        const customer = await fetchCustomerById(searchId);
        setCustomers([customer]);
        setTotalCustomers(1);
      } else {
        // Fetch all customers if no searchId is provided
        const data = await fetchCustomers({
          page: currentPage - 1,
          pageSize,
          sortField,
          sortOrder,
          firstName: searchName,
        });
        setCustomers(data.customers);
        setTotalCustomers(data.totalItems);
      }
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

  const handleSearchIdChange = (e) => {
    const id = e.target.value;
    setSearchId(id);
    updateURLParams({ id });
    loadCustomers();
  };

  const handleSearchNameChange = (e) => {
    const name = e.target.value;
    setSearchName(name);
    updateURLParams({ name });
    loadCustomers();
  };

  const updateURLParams = (newParams) => {
    const params = new URLSearchParams(location.search);
    Object.keys(newParams).forEach(key => {
      if (newParams[key]) {
        params.set(key, newParams[key]);
      } else {
        params.delete(key);
      }
    });
    navigate(`${location.pathname}?${params.toString()}`, { replace: true });
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
      setShowUpdateModal(false);
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

  const handleCreateCustomer = async (customerData) => {
    try {
      await createCustomer(customerData);
      toast.success('Customer created successfully!');
      setShowCreateModal(false);
      loadCustomers(); // Reload customers after creating
    } catch (error) {
      if (error.response && error.response.status === 401) {
        toast.error('Unauthorized: Please log in as an admin.');
      } else if (error.response && error.response.status === 403) {
        toast.error('Forbidden: You do not have permission to create a customer.');
      } else {
        toast.error('Failed to create customer');
      }
      setError(error);
    }
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
    updateURLParams({ page });
  };

  const handlePageSizeChange = (newSize) => {
    setPageSize(newSize);
    setCurrentPage(1);
    updateURLParams({ size: newSize, page: 1 });
  };

  const handleSortChange = (field, order) => {
    setSortField(field);
    setSortOrder(order);
    updateURLParams({ sortField: field, sortOrder: order });
  };

  const handleOpenUpdateModal = (customer) => {
    setSelectedCustomer(customer);
    setShowUpdateModal(true);
  };

  const handleCloseCreateModal = () => {
    setShowCreateModal(false);
    loadCustomers(); // Reload customers after creating
  };

  const handleCloseUpdateModal = () => {
    setShowUpdateModal(false);
    setSelectedCustomer(null);
  };

  const handleBackClick = () => {
   // toast.info('Returning to Dashboard...');
    navigate('/admin/dashboard');
  };

  if (loading) return <div className="text-center"><Spinner animation="border" /></div>;
  if (error) return <div className="alert alert-danger">{error}</div>;

  return (
    <div className="container">
      <h1 className="text-center">Customer Management</h1>
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
      <div className="d-flex justify-content-between mb-3">
        <button className="btn btn-secondary" onClick={handleBackClick}>
          Back to Dashboard
        </button>
        <button className="btn btn-primary" onClick={() => setShowCreateModal(true)}>
          Add Customer
        </button>
      </div>
      {customers && customers.length > 0 ? (
        <Table
          data={customers}
          onUpdate={handleOpenUpdateModal}
          sortField={sortField}
          sortOrder={sortOrder}
          onSort={handleSortChange}
        />
      ) : (
        <div>No customers found</div>
      )}
      <CustomModal
        show={showCreateModal}
        onHide={handleCloseCreateModal}
        title="Create Customer"
      >
        <CustomerCreateForm onClose={handleCloseCreateModal} onCreate={handleCreateCustomer} />
      </CustomModal>
      <CustomModal
        show={showUpdateModal}
        onHide={handleCloseUpdateModal}
        title="Update Customer"
      >
        {selectedCustomer && (
          <CustomerUpdateForm
            customerId={selectedCustomer.id}
            onUpdate={handleUpdateCustomer}
            onClose={handleCloseUpdateModal}
          />
        )}
      </CustomModal>
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

export default CustomerManagement;