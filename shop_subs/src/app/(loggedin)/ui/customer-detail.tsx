"use client";

import { Customer, Phone, Email, Address } from "@/types";
import CustomerLine from "./customer-line";
import PhoneForm from "./phone-form";
import PhoneLine from "./phone-line";
import { useState } from "react";

export default function CustomerDetail(params: {
  customer: Customer;
  phones: Phone[];
  emails: Email[];
  addresses: Address[];
}) {
  const customer = params.customer;
  const emails = params.emails;
  const phones = params.phones;
  const addresses = params.addresses;
  const [isEditingPhone, setIsEditingPhone] = useState(false);

  return (
    <div className='border border-gray-300 rounded p-4 mt-4'>
      <CustomerLine customer={customer} />
      <div className='border border-gray-300 rounded p-4 mt-4'>
        <h3 className='text-lg font-bold'>Phone Numbers</h3>
        <button
          className='p-2 border rounded-sm border-gray-200 hover:bg-slate-400'
          onClick={() => setIsEditingPhone(true)}
        >
          Add Phone
        </button>
        {isEditingPhone && (
          <PhoneForm
            phone={null}
            isEditing={isEditingPhone}
            customer_id={customer.id}
            onSuccess={() => setIsEditingPhone(false)}
            onClose={() => setIsEditingPhone(false)}
          />
        )}
        {phones.map((phone) => (
          <PhoneLine key={phone.id} phone={phone} />
        ))}
      </div>
      <div className='border border-gray-300 rounded p-4 mt-4'>
        <h3 className='text-lg font-bold'>Email Addresses</h3>
        <ul>
          {emails.map((email) => (
            <li key={email.id}>
              <strong>{email.type}:</strong> {email.address}
            </li>
          ))}
        </ul>
      </div>
      <div className='border border-gray-300 rounded p-4 mt-4'>
        <h3 className='text-lg font-bold'>Addresses</h3>
        <ul>
          {addresses.map((address) => (
            <li key={address.id}>
              {address.street}, {address.city}, {address.state}{" "}
              {address.zip_code}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
