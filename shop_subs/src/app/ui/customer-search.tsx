"use client";

import { getCustomers } from "@/app/actions";
import { useState } from "react";
import Link  from "next/link";
import type { Customer } from "@/types";

export function CustomerSearch() {
  const [custList, setCustList] = useState<Customer[]>([]);

  const handleSearch = async (formData: FormData) => {
    const customerId = formData.get("customerId") as string;
    try {
      const data = await getCustomers(1, 20, customerId);
      setCustList(data.items);
    } catch (error) {
      console.error("Error fetching customers:", error);
    }
  };

  return (
    <div className='flex flex-col items-center min-h-screen py-2'>
      <h2 className='text-xl font-bold bg-center'>Customer Search</h2>
      <form
        action={handleSearch}
        className='flex flex-col items-center space-y-2'>
        <input
          type='text'
          name='customerId'
          placeholder='Customer search here...'
          className='border border-gray-300 rounded px-3 py-2 mb-2'
        />
        <button
          type='submit'
          className='bg-blue-500 text-white rounded px-4 py-2 hover:bg-blue-600'>
          Search
        </button>
      </form>
      <div>
        {/* Render the list of customers here */}
        {custList.map((customer: Customer) => (
          <Link
            href={`/customers/${customer.id}`}
            key={customer.id}
            className='border border-gray-300 rounded p-2 mb-2'>
            <h3 className='text-lg font-bold'>
              {customer.first_name} {customer.last_name}
            </h3>
            <p className='text-gray-600'>{customer.id}</p>
            <p className='text-gray-600'>{customer.notes}</p>
          </Link>
        ))}
      </div>
    </div>
  );
}
