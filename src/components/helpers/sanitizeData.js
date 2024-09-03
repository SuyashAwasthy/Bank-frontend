const backendFields = { 
    customer_id: true, 
    first_name: true, 
    last_name: true, 
    isActive: true, 
    total_balance: false 
  }; 
   
  const isToBeIncluded = (field, fieldsToInclude) => { 
    return fieldsToInclude[field] || false; 
  }; 
   
  export const sanitizeCustomerData = (customers, fieldsToInclude) => { 
    return customers.map(customer => { 
      const sanitizedCustomer = {}; 
   
      for (const key in customer) { 
        if (isToBeIncluded(key, fieldsToInclude)) { 
          sanitizedCustomer[key] = customer[key]; 
        } 
      } 
   
      return sanitizedCustomer; 
    }); 
  };