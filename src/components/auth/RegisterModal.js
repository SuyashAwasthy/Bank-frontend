// src/components/auth/RegisterModal.js
import React, { useState } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';
import { register } from '../services/authService'; // Updated to handle registration with backend

const RegisterModal = ({ show, handleClose }) => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [aadhaarCard, setAadhaarCard] = useState(null);
  const [panCard, setPanCard] = useState(null);
  const [role, setRole] = useState('USER'); // Default role
  const [error, setError] = useState('');

  const handleFileChange = (setter) => (e) => {
    setter(e.target.files[0]);
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      await register({ firstName, lastName, email, password, aadhaarCard, panCard, role });
      handleClose(); // Close modal on success
    } catch (e) {
      console.error(e);
      setError('Registration failed. Please try again.');
    }
  };

  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Register</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {error && <div className="alert alert-danger">{error}</div>}
        <Form onSubmit={handleRegister}>
          <Form.Group controlId="formFirstName">
            <Form.Label>First Name</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter first name"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              required
            />
          </Form.Group>
          <Form.Group controlId="formLastName">
            <Form.Label>Last Name</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter last name"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              required
            />
          </Form.Group>
          <Form.Group controlId="formEmail">
            <Form.Label>Email</Form.Label>
            <Form.Control
              type="email"
              placeholder="Enter email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </Form.Group>
          <Form.Group controlId="formPassword">
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="password"
              placeholder="Enter password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </Form.Group>
          <Form.Group controlId="formAadhaarCard">
            <Form.Label>Aadhaar Card (PDF)</Form.Label>
            <Form.Control
              type="file"
              accept="application/pdf"
              onChange={handleFileChange(setAadhaarCard)}
              required
            />
          </Form.Group>
          <Form.Group controlId="formPanCard">
            <Form.Label>PAN Card (PDF)</Form.Label>
            <Form.Control
              type="file"
              accept="application/pdf"
              onChange={handleFileChange(setPanCard)}
              required
            />
          </Form.Group>
          <Form.Group controlId="formRole">
            <Form.Label>Role</Form.Label>
            <Form.Control
              as="select"
              value={role}
              onChange={(e) => setRole(e.target.value)}
            >
              <option value="USER">USER</option>
              <option value="ADMIN">Admin</option>
            </Form.Control>
          </Form.Group>
          <Button variant="primary" type="submit" className="mt-3">
            Register
          </Button>
        </Form>
      </Modal.Body>
    </Modal>
  );
};

export default RegisterModal;