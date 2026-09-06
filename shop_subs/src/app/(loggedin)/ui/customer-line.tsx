"use client";
import CustomerForm from "./customer-form";
import { Customer } from "@/types";

export default function CustomerLine(params: { customer: Customer }) {
  const customer = params.customer;
  return (
    <div className='border border-gray-300 rounded p-4 mt-4 text-2xl font-bold'>
      <p>
        <strong>Name:</strong> {customer.first_name} {customer.last_name}
      </p>
      <p>
        <strong>Notes:</strong> {customer.notes}
      </p>
      <CustomerForm customer={customer} />
    </div>
  );
}
