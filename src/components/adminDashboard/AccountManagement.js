import React, { useState, useEffect, useCallback } from 'react';
import {
  fetchAllAccounts,
  createAccount,
  deleteAccount,
  fetchAccountById
} from '../services/accountService';
import AccountTable from './AccountTable';
import AccountForm from './AccountForm';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Spinner } from 'react-bootstrap';
import CustomPagination from '../sharedcomponents/CustomPagination';
import CustomModal from '../sharedcomponents/CustomModal';
import { useNavigate, useLocation } from 'react-router-dom';
import debounce from 'lodash.debounce';

const AccountManagement = () => {
  const [accounts, setAccounts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [searchId, setSearchId] = useState('');

  const navigate = useNavigate();
  const location = useLocation();

  // Initialize state from URL parameters
  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const id = params.get('id') || '';
    const page = Number(params.get('page')) || 1;
    const size = Number(params.get('size')) || 10;

    setSearchId(id);
    setCurrentPage(page);
    setPageSize(size);
  }, [location.search]);

  useEffect(() => {
    loadAccounts();
  }, [currentPage, pageSize, searchId]);

  const debouncedLoadAccounts = useCallback(
    debounce(() => {
      loadAccounts();
    }, 300),
    [searchId, currentPage, pageSize]
  );

  const loadAccounts = async () => {
    setLoading(true);
    try {
      if (searchId) {
        // Fetch a single account by ID if searchId is provided
        const account = await fetchAccountById(searchId);
        setAccounts([account]);
        setTotalPages(1);
      } else {
        // Fetch all accounts if no searchId is provided
        const response = await fetchAllAccounts(currentPage, pageSize);
        setAccounts(response.data);
        setTotalPages(response.totalPages);
      }
    } catch (error) {
      toast.error('Failed to load accounts.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    debouncedLoadAccounts();
    return () => {
      debouncedLoadAccounts.cancel();
    };
  }, [debouncedLoadAccounts]);

  const handleCreateAccount = async (accountData) => {
    try {
      const newAccount = await createAccount(accountData);
      setAccounts([...accounts, newAccount]);
      toast.success('Account created successfully!');
      setShowModal(false);
    } catch (error) {
      toast.error('Failed to create account.');
    }
  };

  const handleDeleteAccount = async (id) => {
    try {
      await deleteAccount(id);
      setAccounts((prevAccounts) =>
        prevAccounts.filter((account) => account.id !== id)
      );
      toast.success('Account deleted successfully!');
    } catch (error) {
      toast.error('Failed to delete account.');
    }
  };

  const handleSearchIdChange = (e) => {
    const id = e.target.value;
    setSearchId(id);
    updateURLParams({ id });
  };

  const handleCreateClick = () => {
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  const handleBackClick = () => {
    navigate('/admin/dashboard');
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

  return (
    <div className="container py-5">
      <h1 className="text-center mb-4">Account Management</h1>
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
        </div>
      </div>
      <div className="d-flex justify-content-between mb-3">
        <button onClick={handleBackClick} className="btn btn-secondary">
          Back to Dashboard
        </button>
        <button onClick={handleCreateClick} className="btn btn-primary">
          Create Account
        </button>
      </div>
      {loading ? (
        <div className="d-flex justify-content-center">
          <Spinner animation="border" />
        </div>
      ) : (
        <>
          <AccountTable
            accounts={accounts}
            onDelete={handleDeleteAccount}
          />
          <CustomPagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={(page) => {
              setCurrentPage(page);
              updateURLParams({ page });
            }}
            onPageSizeChange={(size) => {
              setPageSize(size);
              setCurrentPage(1); // Reset to first page on page size change
              updateURLParams({ size, page: 1 });
            }}
            pageSize={pageSize}
          />
        </>
      )}
      <CustomModal show={showModal} onHide={handleCloseModal} title="Create Account">
        <AccountForm
          onSave={handleCreateAccount}
          onClose={handleCloseModal}
        />
      </CustomModal>
      <ToastContainer />
    </div>
  );
};

export default AccountManagement;