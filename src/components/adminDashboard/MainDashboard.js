import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Card, Row, Col, Container, Button, Navbar, Nav, Spinner } from 'react-bootstrap';
import { ToastContainer, toast } from 'react-toastify';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'react-toastify/dist/ReactToastify.css'; // Import Toastify CSS
import './MainDashboard.css'; // Ensure this file has the necessary styling enhancements

const MainDashboard = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);

  const navigateTo = (path) => {
    setIsLoading(true); // Set loading state to true
    navigate(path);
  };

  const handleLogout = () => {
    // Clear user session or authentication token here
    localStorage.clear(); // Example: clear local storage
    setIsLoading(true); // Set loading state to true

    // Show a toast notification
    toast.info('You have been logged out successfully.');

    // Simulate a short delay before navigating to ensure the loading spinner appears
    setTimeout(() => {
      navigate('/login'); // Navigate to the login page after logout
      setIsLoading(false); // Reset loading state
    }, 500);
  };

  const handleBackClick = () => {
    // Show a toast notification when navigating back
    toast.info('Returning to Dashboard...');

    // Navigate to the dashboard
    navigate('/admin/dashboard');
  };
  return (
    <>
      {/* Navigation Bar */}
      <Navbar bg="dark" variant="dark" expand="lg" className="mb-4">
        <Container>
          <Navbar.Brand as={Link} to="/">Banking Application</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="ml-auto">
              <Nav.Link as={Link} to="/admin/customers">Customers</Nav.Link>
              <Nav.Link as={Link} to="/admin/accounts">Accounts</Nav.Link>
              <Nav.Link as={Link} to="/admin/transactions">Transactions</Nav.Link>
              <Button variant="outline-light" onClick={handleLogout} className="ml-3">
                Logout
              </Button>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>

      {/* Dashboard Content */}
      <Container className="mt-4">
        <h1 className="text-center mb-4">Banking Application Dashboard</h1>
        <Row className="mt-4 justify-content-center">
          {/* Display loading spinner when loading */}
          {isLoading ? (
            <Spinner animation="border" variant="primary" className="mt-5" />
          ) : (
            <>
              {/* Customer Management */}
              <Col md={4} sm={12} className="mb-4">
                <Card
                  onClick={() => navigateTo('/admin/customers')}
                  className="dashboard-card shadow-sm"
                  style={{ cursor: 'pointer' }}
                  aria-label="Navigate to Customer Management"
                >
                  <Card.Img
                    variant="top"
                    src="/images/customer-management.webp"
                    alt="Customer Management"
                    className="dashboard-card-img"
                  />
                  <Card.Body className="text-center">
                    <Card.Title>Customer Management</Card.Title>
                    <Card.Text>
                      Manage all customers, view customer details, add, update, or delete customers.
                    </Card.Text>
                    <Button variant="primary" className="mt-2">
                      Go to Customers
                    </Button>
                  </Card.Body>
                </Card>
              </Col>
              {/* Account Management */}
              <Col md={4} sm={12} className="mb-4">
                <Card
                  onClick={() => navigateTo('/admin/accounts')}
                  className="dashboard-card shadow-sm"
                  style={{ cursor: 'pointer' }}
                  aria-label="Navigate to Account Management"
                >
                  <Card.Img
                    variant="top"
                    src="/images/account-management.webp"
                    alt="Account Management"
                    className="dashboard-card-img"
                  />
                  <Card.Body className="text-center">
                    <Card.Title>Account Management</Card.Title>
                    <Card.Text>
                      View and manage customer accounts, update account statuses, manage balances.
                    </Card.Text>
                    <Button variant="primary" className="mt-2">
                      Go to Accounts
                    </Button>
                  </Card.Body>
                </Card>
              </Col>
              {/* Transaction Management */}
              <Col md={4} sm={12} className="mb-4">
                <Card
                  onClick={() => navigateTo('/admin/transactions')}
                  className="dashboard-card shadow-sm"
                  style={{ cursor: 'pointer' }}
                  aria-label="Navigate to Transaction Management"
                >
                  <Card.Img
                    variant="top"
                    src="/images/transaction-management.webp"
                    alt="Transaction Management"
                    className="dashboard-card-img"
                  />
                  <Card.Body className="text-center">
                    <Card.Title>Transaction Management</Card.Title>
                    <Card.Text>
                      View and manage transactions, approve or deny transfers, set limits.
                    </Card.Text>
                    <Button variant="primary" className="mt-2">
                      Go to Transactions
                    </Button>
                  </Card.Body>
                </Card>
              </Col>
            </>
          )}
        </Row>
      </Container>
      <ToastContainer /> {/* Include ToastContainer to display toasts */}
    </>
  );
};

export default MainDashboard;