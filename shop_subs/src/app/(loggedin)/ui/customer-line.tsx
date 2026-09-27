"use client";
import CustomerForm from "./customer-form";
import { Customer } from "@/types";

export default function CustomerLine(params: { customer: Customer }) {
  const customer = params.customer;
  return (
    <div className='space-y-1 text-sm'>
      <p className='font-medium text-foreground'>
        {customer.first_name} {customer.last_name}
      </p>
      {customer.notes && (
        <p className='whitespace-pre-wrap'>{customer.notes}</p>
      )}
      <CustomerForm customer={customer} />
    </div>
  );
}
