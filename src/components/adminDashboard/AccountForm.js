import React, { useState, useEffect } from 'react';
import { Form, Button, Alert } from 'react-bootstrap';

const AccountForm = ({ account, onSave, onClose }) => {
  const [formData, setFormData] = useState({
    id: '',
    accountNo: '',
    balance: '',
    customerId: '',
    bankId: '',
    active: true,
  });

  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (account) {
      setFormData({
        id: account.id || '',
        accountNo: account.accountNo || '',
        balance: account.balance || '', // Ensure default value
        customerId: account.customerId || '',
        bankId: account.bankId || '',
        active: account.active || true, // Ensure default value
      });
    }
  }, [account]);

  const validate = () => {
    const newErrors = {};
    if (!formData.accountNo) newErrors.accountNo = 'Account number is required.';
    if (isNaN(formData.balance) || formData.balance <= 0) newErrors.balance = 'Balance must be a positive number.';
    if (isNaN(formData.customerId) || formData.customerId <= 0) newErrors.customerId = 'Customer ID must be a positive number.';
    if (isNaN(formData.bankId) || formData.bankId <= 0) newErrors.bankId = 'Bank ID must be a positive number.';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validate()) {
      const updatedData = {
        ...formData,
        balance: parseFloat(formData.balance), // Ensure balance is a number
        customerId: parseInt(formData.customerId, 10), // Ensure customerId is a number
        bankId: parseInt(formData.bankId, 10), // Ensure bankId is a number
      };
      onSave(updatedData);
    }
  };

  return (
    <Form onSubmit={handleSubmit}>
      {Object.keys(errors).length > 0 && (
        <Alert variant="danger">
          {Object.values(errors).map((error, index) => (
            <div key={index}>{error}</div>
          ))}
        </Alert>
      )}
      <Form.Group controlId="formAccountNo">
        <Form.Label>Account Number</Form.Label>
        <Form.Control
          type="text"
          name="accountNo"
          value={formData.accountNo}
          onChange={handleChange}
          isInvalid={!!errors.accountNo}
        />
        <Form.Control.Feedback type="invalid">
          {errors.accountNo}
        </Form.Control.Feedback>
      </Form.Group>
      <Form.Group controlId="formBalance">
        <Form.Label>Balance</Form.Label>
        <Form.Control
          type="number"
          name="balance"
          value={formData.balance}
          onChange={handleChange}
          isInvalid={!!errors.balance}
        />
        <Form.Control.Feedback type="invalid">
          {errors.balance}
        </Form.Control.Feedback>
      </Form.Group>
      <Form.Group controlId="formCustomerId">
        <Form.Label>Customer ID</Form.Label>
        <Form.Control
          type="number"
          name="customerId"
          value={formData.customerId}
          onChange={handleChange}
          isInvalid={!!errors.customerId}
        />
        <Form.Control.Feedback type="invalid">
          {errors.customerId}
        </Form.Control.Feedback>
      </Form.Group>
      <Form.Group controlId="formBankId">
        <Form.Label>Bank ID</Form.Label>
        <Form.Control
          type="number"
          name="bankId"
          value={formData.bankId}
          onChange={handleChange}
          isInvalid={!!errors.bankId}
        />
        <Form.Control.Feedback type="invalid">
          {errors.bankId}
        </Form.Control.Feedback>
      </Form.Group>
      <Form.Group controlId="formActive">
        <Form.Check
          type="checkbox"
          label="Active"
          name="active"
          checked={formData.active}
          onChange={handleChange}
        />
      </Form.Group>
      <Button variant="primary" type="submit">
        Save
      </Button>
      <Button variant="secondary" onClick={onClose} className="ms-2">
        Cancel
      </Button>
    </Form>
  );
};

export default AccountForm;