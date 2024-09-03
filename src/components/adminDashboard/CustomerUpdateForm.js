// import React, { useState, useEffect } from 'react'; 
// import { useParams } from 'react-router-dom'; 
// import axios from 'axios';
 
// const CustomerUpdateForm = ({ onSubmit }) => { 
//   const token = localStorage.getItem("token"); 
//   const { customerId } = useParams(); 
//   const [customer, setCustomer] = useState({firstName:"",lastName:""}); 
//   const [formData, setFormData] = useState({ 
//     id: '', 
//     firstName: '', 
//     lastName: '', 
//     email: '', 
//     isActive: true, 
//   }); 
//   const [loading, setLoading] = useState(true); 
//   const [error, setError] = useState(null); 
 
//   useEffect(() => {

//     const fetchCustomerData = async () => {
//       try {
//         const response = await axios.get(`http://localhost:8080/admin/customer/${customerId}`, {
//           headers: {
//             Authorization: `Bearer ${token}`
//           }
//         });
//         setCustomer({
//           firstName: response.data.firstName,
//           lastName: response.data.lastName
//         });

//         console.log(customer);

//       } catch (error) {
//         console.error("Error fetching customer data:", error);
//       }
//     };

//     fetchCustomerData();
//   }, [customerId]);
 
//   // const handleChange = (e) => { 
//   //   const { name, value } = e.target; 
//   //   // Handle boolean conversion for isActive 
//   //   setFormData({ ...formData, [name]: name === 'isActive' ? value === 'true' : value }); 
//   // }; 
 

//   const handleSubmit = (e) => { 
//     e.preventDefault(); 
//     onSubmit(formData); 
//   }; 
 
//   // if (loading) { 
//   //   return <div>Loading...</div>; 
//   // } 
 
//   // if (error) { 
//   //   return <div>{error}</div>; 
//   // } 

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setCustomer((prevData) => ({
//       ...prevData,
//       [name]: value
//     }));
//   }
 
//   return ( 
//     <form onSubmit={handleSubmit}> 
//       <h3>Update Customer</h3> 
//       <div> 
//         <label>First Name:</label> 
//         <input 
//           onChange={handleChange}
//           type="text" 
//           name="name" 
//           value={customer.firstName} 
//           required 
//         /> 
//       </div> 
//       <div> 
//         <label>Last Name:</label> 
//         <input 
//           onChange={handleChange} 
//           type="text" 
//           name="name" 
//           value={customer.lastName} 
//           required 
//         /> 
//       </div> 
//       <button type="submit">Save Changes</button> 
//     </form> 
//   ); 
// }; 
 
// export default CustomerUpdateForm;


// import React, { useEffect, useState } from "react";
// import { useNavigate, useParams } from "react-router-dom";
// import axios from "axios";

// const CustomerUpdateForm = () => {
//   const token = localStorage.getItem('token')
//   const { customerId } = useParams();
//   const navigate = useNavigate();
//   const [customerData, setCustomerData] = useState({


//     firstName: "",
//     lastName: ""
//   });

//   useEffect(() => {

//     const fetchCustomerData = async () => {
//       try {
//         const response = await axios.get(`http://localhost:8080/admin/customer/${customerId}`, {
//           headers: {
//             Authorization: `Bearer ${token}`
//           }
//         });
//         setCustomerData({
//           firstName: response.data.firstName,
//           lastName: response.data.lastName
//         });
//       } catch (error) {
//         console.error("Error fetching customer data:", error);
//       }
//     };

//     fetchCustomerData();
//   }, [customerId]);

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setCustomerData((prevData) => ({
//       ...prevData,
//       [name]: value
//     }));
//   };

//   const handleSubmit = async (e) => {
//     console.log(token)
//     console.log(customerData.firstName);
//     console.log(customerData.lastName);
//     e.preventDefault();
//     try {
//       await axios.put(`http://localhost:8080/customer/profile/${customerId}`, { firstName: customerData.firstName, lastName: customerData.lastName }, {
//         headers: {
//           Authorization: `Bearer ${token}`
//         }
//       });
//       alert("Customer updated successfully!");
//       navigate(-1)

//     } catch (error) {
//     //  alert("Customer Inactive");
//     //  console.error("customer is inactive:", error);
//     }
//   };

//   return (
//     <div className="update-customer">
//       <h2>Update Customer</h2>
//       <form onSubmit={handleSubmit}>
//         <div className="form-group">
//           <label>First Name:</label>
//           <input
//             type="text"
//             name="name"
//             value={customerData.firstName}
//             onChange={handleChange}
//             required
//           />
//         </div>
//         <div className="form-group">
//           <label>Last Name:</label>
//           <input
//             type="text"
//             name="name"
//             value={customerData.lastName}
//             onChange={handleChange}
//             required
//           />
//         </div>
//         <button type="submit" className="submit-button">
//           Update Customer
//         </button>
//       </form>
//     </div>
//   );
// };

// export default CustomerUpdateForm;

// import React, { useEffect, useState } from "react";
// import { useNavigate, useParams } from "react-router-dom";
// import axios from "axios";

// const CustomerUpdateForm = () => {
//   const token = localStorage.getItem("token");
//   const { customerId } = useParams();
//   const navigate = useNavigate();
//   const [customerData, setCustomerData] = useState({
//     firstName: "",
//     lastName: ""
//   });

//   useEffect(() => {
//     const fetchCustomerData = async () => {
//       try {
//         const response = await axios.get(
//           `http://localhost:8080/admin/customer/${customerId}`,
//           {
//             headers: {
//               Authorization: `Bearer ${token}`
//             }
//           }
//         );
//         setCustomerData({
//           firstName: response.data.firstName,
//           lastName: response.data.lastName
//         });
//       } catch (error) {
//         console.error("Error fetching customer data:", error);
//       }
//     };

//     fetchCustomerData();
//   }, [customerId, token]);

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setCustomerData((prevData) => ({
//       ...prevData,
//       [name]: value
//     }));
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       await axios.put(
//         `http://localhost:8080/customer/profile/${customerId}`,
//         {
//           firstName: customerData.firstName,
//           lastName: customerData.lastName
//         },
//         {
//           headers: {
//             Authorization: `Bearer ${token}`
//           }
//         }
//       );
//       alert("Customer updated successfully!");
//       navigate(-1);
//     } catch (error) {
//       alert("Error updating customer");
//       console.error("Error updating customer:", error);
//     }
//   };

//   return (
//     <div className="update-customer">
//       <h2>Update Customer</h2>
//       <form onSubmit={handleSubmit}>
//         <div className="form-group">
//           <label>First Name:</label>
//           <input
//             type="text"
//             name="firstName"
//             value={customerData.firstName}
//             onChange={handleChange}
//             required
//           />
//         </div>
//         <div className="form-group">
//           <label>Last Name:</label>
//           <input
//             type="text"
//             name="lastName"
//             value={customerData.lastName}
//             onChange={handleChange}
//             required
//           />
//         </div>
//         <button type="submit" className="submit-button">
//           Update Customer
//         </button>
//       </form>
//     </div>
//   );
// };

// export default CustomerUpdateForm;

import React, { useState, useEffect } from 'react';
import { Form, Button, Alert } from 'react-bootstrap';
import { fetchCustomerById } from '../services/customerService';

const CustomerUpdateForm = ({ customerId, onUpdate, onClose }) => {
  const [customerData, setCustomerData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    isActive: true,
  });
  const [errors, setErrors] = useState({});

  useEffect(() => {
    const loadCustomer = async () => {
      try {
        const customer = await fetchCustomerById(customerId);
        setCustomerData(customer);
      } catch (error) {
        console.error('Error fetching customer:', error);
      }
    };

    loadCustomer();
  }, [customerId]);

  const validate = () => {
    const newErrors = {};
    if (!customerData.firstName) newErrors.firstName = 'First Name is required.';
    if (!customerData.lastName) newErrors.lastName = 'Last Name is required.';
    if (!customerData.email) {
      newErrors.email = 'Email is required.';
    } else if (!/\S+@\S+\.\S+/.test(customerData.email)) {
      newErrors.email = 'Email is invalid.';
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCustomerData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validate()) {
      onUpdate(customerData);
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
      <Form.Group controlId="firstName">
        <Form.Label>First Name</Form.Label>
        <Form.Control
          type="text"
          name="firstName"
          value={customerData.firstName}
          onChange={handleChange}
          isInvalid={!!errors.firstName}
        />
        <Form.Control.Feedback type="invalid">
          {errors.firstName}
        </Form.Control.Feedback>
      </Form.Group>
      <Form.Group controlId="lastName">
        <Form.Label>Last Name</Form.Label>
        <Form.Control
          type="text"
          name="lastName"
          value={customerData.lastName}
          onChange={handleChange}
          isInvalid={!!errors.lastName}
        />
        <Form.Control.Feedback type="invalid">
          {errors.lastName}
        </Form.Control.Feedback>
      </Form.Group>
      <Form.Group controlId="email">
        <Form.Label>Email</Form.Label>
        <Form.Control
          type="email"
          name="email"
          value={customerData.email}
          onChange={handleChange}
          isInvalid={!!errors.email}
        />
        <Form.Control.Feedback type="invalid">
          {errors.email}
        </Form.Control.Feedback>
      </Form.Group>
      <Form.Group controlId="isActive">
        <Form.Check
          type="checkbox"
          name="isActive"
          label="Active"
          checked={customerData.isActive}
          onChange={(e) =>
            setCustomerData((prevData) => ({
              ...prevData,
              isActive: e.target.checked,
            }))
          }
        />
      </Form.Group>
      <Button variant="primary" type="submit">
        Update
      </Button>
      <Button variant="secondary" onClick={onClose}>
        Cancel
      </Button>
    </Form>
  );
};

export default CustomerUpdateForm;