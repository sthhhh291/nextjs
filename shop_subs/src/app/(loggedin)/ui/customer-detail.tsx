"use client";

import { Customer, Phone, Email, Address } from "@/types";
import CustomerLine from "./customer-line";
import PhoneForm from "./phone-form";
import CarForm from "./car-form";
import PhoneLine from "./phone-line";
import { useState } from "react";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardAction,
} from "@/components/ui/card";

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
  const [isEditingCar, setIsEditingCar] = useState(false);

  return (
    <>
      <Card>
        <CardHeader>
          <CardTitle>Customer Details</CardTitle>
          <CardDescription>
            <CustomerLine customer={customer} />
          </CardDescription>
        </CardHeader>
      </Card>
      <Card>
        <CardHeader>
          <CardTitle>Actions</CardTitle>
          <CardDescription>
            <PhoneForm phone={null} customer_id={customer.id} />
          </CardDescription>
        </CardHeader>
      </Card>
      <Card>
        <CardHeader>
          <CardTitle>Phone Numbers</CardTitle>
          <CardDescription>
            {phones.map((phone) => (
              <PhoneLine key={phone.id} phone={phone} />
            ))}
          </CardDescription>
        </CardHeader>
      </Card>
    </>
    // <div className='border border-gray-300 rounded p-4 mt-4'>
    //   <CustomerLine customer={customer} />
    //   <div className='border border-gray-300 rounded p-4 mt-4'>
    //     <h3 className='text-lg font-bold'>Actions</h3>
    //     <button
    //       className='p-2 border rounded-sm border-gray-200 hover:bg-slate-400 text-bold'
    //       onClick={() => setIsEditingPhone(true)}>
    //       Add Phone
    //     </button>
    //     <button
    //       className='p-2 border rounded-sm border-gray-200 hover:bg-slate-400 text-bold'
    //       onClick={() => setIsEditingCar(true)}>
    //       Add Car
    //     </button>
    //     {isEditingPhone && (
    //       <PhoneForm
    //         phone={null}
    //         isEditing={isEditingPhone}
    //         customer_id={customer.id}
    //         onSuccess={() => setIsEditingPhone(false)}
    //         onClose={() => setIsEditingPhone(false)}
    //       />
    //     )}
    //     {isEditingCar && (
    //       <CarForm
    //         car={null}
    //         isEditing={isEditingCar}
    //         customer_id={customer.id}
    //         onSuccess={() => setIsEditingCar(false)}
    //         onClose={() => setIsEditingCar(false)}
    //       />
    //     )}
    //   </div>
    //   <div className='border border-gray-300 rounded p-4 mt-4'>
    //     <h3 className='text-lg font-bold'>Phone Numbers</h3>
    //     {phones.map((phone) => (
    //       <PhoneLine key={phone.id} phone={phone} />
    //     ))}
    //   </div>
    //   <div className='border border-gray-300 rounded p-4 mt-4'>
    //     <h3 className='text-lg font-bold'>Email Addresses</h3>
    //     <ul>
    //       {emails.map((email) => (
    //         <li key={email.id}>
    //           <strong>{email.type}:</strong> {email.address}
    //         </li>
    //       ))}
    //     </ul>
    //   </div>
    //   <div className='border border-gray-300 rounded p-4 mt-4'>
    //     <h3 className='text-lg font-bold'>Addresses</h3>
    //     <ul>
    //       {addresses.map((address) => (
    //         <li key={address.id}>
    //           {address.street}, {address.city}, {address.state}{" "}
    //           {address.zip_code}
    //         </li>
    //       ))}
    //     </ul>
    //   </div>
    // </div>
  );
}
