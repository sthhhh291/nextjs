import React from "react";
import CustomerForm from "./CustomerForm";
import { add_customer } from "@/lib/api/customers";

// Define a Customer type according to your data structure
type Customer = {
  // Add the appropriate fields for your customer object
  first_name: string;
  last_name: string;
  notes: string;
  // Add other fields as needed
};

// Add other fields as needed

const AddCustomer: React.FC = () => {
  const handleAddCustomer = (data: Customer) => {
    add_customer(data);
  };

  return (
    <div>
      <h2>Add Customer</h2>
      <CustomerForm onSubmit={handleAddCustomer} />
    </div>
  );
};

export default AddCustomer;
