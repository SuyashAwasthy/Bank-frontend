import React, { useEffect, useState, useCallback } from 'react';
import {
  fetchAllTransactions,
  fetchTransactionById,
  getPassbook,
} from '../services/transactionService';
import TransactionTable from './TransactionTable';
import PageSize from '../sharedcomponents/PageSize';
import Pagination from '../sharedcomponents/CustomPagination';
import debounce from 'lodash.debounce';
import { ToastContainer, toast } from 'react-toastify';
import { useNavigate, useLocation } from 'react-router-dom';
import { Modal, Spinner } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'react-toastify/dist/ReactToastify.css';

const TransactionManagement = () => {
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [totalPages, setTotalPages] = useState(1);
  const [searchId, setSearchId] = useState('');
  const [accountId, setAccountId] = useState('');
  const navigate = useNavigate();
  const location = useLocation(); // Hook to access the location object

  useEffect(() => {
    // Initialize search params from URL
    const searchParams = new URLSearchParams(location.search);
    const idFromParams = searchParams.get('searchId');
    const accountFromParams = searchParams.get('accountId');

    if (idFromParams) {
      setSearchId(idFromParams);
      loadTransactionById(idFromParams); // Load data based on the search ID
    }

    if (accountFromParams) {
      setAccountId(accountFromParams);
      loadPassbook(accountFromParams); // Load data based on the account ID
    }
  }, [location.search]);

  const debouncedLoadTransactions = useCallback(
    debounce(() => {
      loadTransactions();
    }, 300),
    [searchId, currentPage, pageSize]
  );

  const loadTransactions = async () => {
    try {
      setLoading(true);
      setError(null);
      let data, totalPages;

      if (searchId) {
        const response = await fetchTransactionById(searchId);
        setTransactions(response ? [response] : []);
        setTotalPages(1);
      } else {
        const response = await fetchAllTransactions(currentPage - 1, pageSize);
        data = response.data;
        totalPages = response.totalPages;
        setTransactions(data);
        setTotalPages(totalPages);
      }
    } catch (error) {
      console.error('Error fetching transactions:', error);
      setError('Error loading transactions.');
      toast.error('Failed to load transactions.');
    } finally {
      setLoading(false);
    }
  };

  const loadTransactionById = async (id) => {
    try {
      setLoading(true);
      setError(null);
      const response = await fetchTransactionById(id);
      setTransactions(response ? [response] : []);
      setTotalPages(1);
    } catch (error) {
      console.error('Error fetching transaction by ID:', error);
      setError('Error fetching transaction by ID.');
      toast.error('Failed to load transaction.');
    } finally {
      setLoading(false);
    }
  };

  const loadPassbook = async (id = accountId) => {
    if (id) {
      setLoading(true);
      setError(null);
      try {
        const response = await getPassbook(id);
        setTransactions(response);
        setTotalPages(1); // Assuming passbook has no pagination
      } catch (error) {
        console.error('Error fetching passbook:', error);
        setError('Error fetching passbook.');
        toast.error('Failed to fetch passbook.');
      } finally {
        setLoading(false);
      }
    }
  };

  useEffect(() => {
    if (!searchId) debouncedLoadTransactions();
    return () => {
      debouncedLoadTransactions.cancel();
    };
  }, [debouncedLoadTransactions, searchId]);

  const handleSearchById = () => {
    navigate(`?searchId=${searchId}`); // Update the URL with the searchId
    loadTransactionById(searchId); // Fetch transaction by ID
  };

  const handlePassbook = () => {
    navigate(`?accountId=${accountId}`); // Update the URL with the accountId
    loadPassbook(); // Fetch passbook
  };

  const handlePageSizeChange = (newSize) => {
    setPageSize(newSize);
    setCurrentPage(1);
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const handleBackClick = () => {
    navigate('/admin/dashboard');
  };

  if (loading) return <div className="text-center"><Spinner animation="border" /></div>;
  if (error) return <div className="alert alert-danger">{error}</div>;

  return (
    <div className="container">
      <h1 className="text-center">Transaction Management</h1>
      <button className="btn btn-secondary mb-3" onClick={handleBackClick}>
        Back to Dashboard
      </button>
      <div className="mb-4">
        <div className="row">
          <div className="col-md-4 mb-3">
            <input
              type="text"
              placeholder="Search by ID"
              value={searchId}
              onChange={(e) => setSearchId(e.target.value)}
              className="form-control"
            />
            <button className="btn btn-primary mt-2" onClick={handleSearchById}>Search</button>
          </div>
          <div className="col-md-4 mb-3">
            <input
              type="text"
              placeholder="Account ID"
              value={accountId}
              onChange={(e) => setAccountId(e.target.value)}
              className="form-control"
            />
            <button className="btn btn-primary mt-2" onClick={handlePassbook}>Get Passbook</button>
          </div>
        </div>
      </div>
      {transactions && transactions.length > 0 ? (
        <TransactionTable transactions={transactions} />
      ) : (
        <div>No transactions found</div>
      )}
      <div className="d-flex justify-content-between align-items-center mt-3">
        <PageSize
          pageSize={pageSize}
          onPageSizeChange={handlePageSizeChange}
        />
        <Pagination
          currentPage={currentPage}
          totalItems={totalPages * pageSize}
          itemsPerPage={pageSize}
          onPageChange={handlePageChange}
        />
      </div>
      <ToastContainer />
    </div>
  );
};

export default TransactionManagement;