import React, { useState } from 'react';
import { createCustomer } from '../services/customerService';
import { ToastContainer, toast } from 'react-toastify';

const CustomerCreateForm = ({ onClose }) => {
  const [customer, setCustomer] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    aadhaarCard: '',
    panCard: '',
    isActive: true,
  });

  const [errors, setErrors] = useState({});

  const validate = () => {
    const newErrors = {};
    if (!customer.firstName) newErrors.firstName = 'First name is required';
    if (!customer.lastName) newErrors.lastName = 'Last name is required';
    if (!customer.email) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(customer.email)) {
      newErrors.email = 'Email address is invalid';
    }
    if (!customer.password) newErrors.password = 'Password is required';
    if (customer.password.length < 6) newErrors.password = 'Password must be at least 6 characters long';
    if (customer.aadhaarCard && !/^[A-Z0-9]{12}$/.test(customer.aadhaarCard)) {
      newErrors.aadhaarCard = 'Aadhaar card number is invalid';
    }
    if (customer.panCard && !/^[A-Z]{5}[0-9]{4}[A-Z]{1}$/.test(customer.panCard)) {
      newErrors.panCard = 'PAN card number is invalid';
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCustomer((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;
    try {
      await createCustomer(customer);
      toast.success('Customer created successfully!');
      onClose();
    } catch (error) {
      toast.error('Failed to create customer.');
    }
  };

  return (
    <div>
      <h2>Create Customer</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>First Name</label>
          <input
            type="text"
            name="firstName"
            value={customer.firstName}
            onChange={handleChange}
            className={`form-control ${errors.firstName ? 'is-invalid' : ''}`}
          />
          {errors.firstName && <div className="invalid-feedback">{errors.firstName}</div>}
        </div>
        <div className="form-group">
          <label>Last Name</label>
          <input
            type="text"
            name="lastName"
            value={customer.lastName}
            onChange={handleChange}
            className={`form-control ${errors.lastName ? 'is-invalid' : ''}`}
          />
          {errors.lastName && <div className="invalid-feedback">{errors.lastName}</div>}
        </div>
        <div className="form-group">
          <label>Email</label>
          <input
            type="email"
            name="email"
            value={customer.email}
            onChange={handleChange}
            className={`form-control ${errors.email ? 'is-invalid' : ''}`}
          />
          {errors.email && <div className="invalid-feedback">{errors.email}</div>}
        </div>
        <div className="form-group">
          <label>Password</label>
          <input
            type="password"
            name="password"
            value={customer.password}
            onChange={handleChange}
            className={`form-control ${errors.password ? 'is-invalid' : ''}`}
          />
          {errors.password && <div className="invalid-feedback">{errors.password}</div>}
        </div>
        <div className="form-group">
          <label>Aadhaar Card Path</label>
          <input
            type="text"
            name="aadhaarCard"
            value={customer.aadhaarCard}
            onChange={handleChange}
            className={`form-control ${errors.aadhaarCard ? 'is-invalid' : ''}`}
          />
          {errors.aadhaarCard && <div className="invalid-feedback">{errors.aadhaarCard}</div>}
        </div>
        <div className="form-group">
          <label>Pan Card Path</label>
          <input
            type="text"
            name="panCard"
            value={customer.panCard}
            onChange={handleChange}
            className={`form-control ${errors.panCard ? 'is-invalid' : ''}`}
          />
          {errors.panCard && <div className="invalid-feedback">{errors.panCard}</div>}
        </div>
        <div className="form-group">
          <label>Active</label>
          <input
            type="checkbox"
            name="isActive"
            checked={customer.isActive}
            onChange={(e) => setCustomer({ ...customer, isActive: e.target.checked })}
            className="form-control"
          />
        </div>
        <button type="submit" className="btn btn-primary">Create</button>
      </form>
      <ToastContainer />
    </div>
  );
};

export default CustomerCreateForm;