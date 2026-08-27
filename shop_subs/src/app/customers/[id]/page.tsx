import {getCustomerById, getCustomerPhones} from "@/app/actions";
import { notFound } from "next/navigation";
import type { Customer, Phone } from "@/types";

export default async function CustomerPage({ params }: { params: { id: string } }) {
  const customerId = Number((await params).id);
  let customer: Customer | null = null;
  let phones: Phone[] = [];
    try {
        customer = await getCustomerById(customerId);
        phones = await getCustomerPhones(customerId);
    } catch (error) {
        console.error("Error fetching customer:", error);
        notFound();
    }

    if (!customer) {    
    notFound();
  }

    return (
    <div className='flex flex-col items-center min-h-screen py-2'>
      <h2 className='text-xl font-bold bg-center'>Customer Details</h2>
      <div className='border border-gray-300 rounded p-4 mt-4'>
        <p><strong>Name:</strong> {customer?.first_name} {customer?.last_name}</p>
        <p><strong>Notes:</strong> {customer?.notes}</p>
      </div>
      <div className='border border-gray-300 rounded p-4 mt-4'>
        <h3 className='text-lg font-bold'>Phone Numbers</h3>
        <ul>
          {phones.map((phone) => (
            <li key={phone.id}>
              <strong>{phone.type}:</strong> {phone.number}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );}