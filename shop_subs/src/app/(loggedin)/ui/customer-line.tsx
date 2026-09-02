"use client";
import { useState } from "react";
import CustomerForm from "./customer-form";
import { Customer } from "@/types";
// import { revalidate } from "next/cache";
// import { useEffect } from "react";

export default function CustomerLine(params: { customer: Customer }) {
  const [isEditing, setIsEditing] = useState(false);
  const customer = params.customer;
  const updateCustomer = () => {
    setIsEditing(false);
  };
  return (
    <div className='border border-gray-300 rounded p-4 mt-4 text-2xl font-bold'>
      {isEditing ?
        <CustomerForm
          customer={customer}
          isEditing={isEditing}
          onSuccess={updateCustomer}
          onClose={() => setIsEditing(false)}
        />
      : <>
          <p>
            <strong>Name:</strong> {customer.first_name} {customer.last_name}
          </p>
          <p>
            <strong>Notes:</strong> {customer.notes}
          </p>
          <button
            className='p-2 border rounded-sm border-gray-200 hover:bg-slate-400'
            onClick={() => setIsEditing(true)}>
            Edit Customer
          </button>
        </>
      }
    </div>
  );
}
