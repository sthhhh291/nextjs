import { getCarById, getCustomerById } from "@/app/actions";
import { notFound } from "next/navigation";
import Link from "next/link";
import type { Customer, Car } from "@/types";

export default async function CustomerPage({
  params,
}: {
  params: { id: string };
}) {
  const carId = Number((await params).id);
  let car: Car | null = null;
  let customer: Customer | null = null;
  //   let phones: Phone[] = [];
  //   let emails: Email[] = [];
  //   let addresses: Address[] = [];

  try {
    car = await getCarById(carId);
  } catch (error) {
    console.error("Error fetching car:", error);
    notFound();
  }

  if (!car) {
    notFound();
  }

  try {
    customer = await getCustomerById(car.customer_id);
  } catch (error) {
    console.error("Error fetching customer:", error);
    notFound();
  }

  if (!customer) {
    notFound();
  }

  return (
    <>
      <h2 className='text-xl font-bold bg-center align-center text-center p-4 rounded-lg shadow-md mt-4'>
        Car Details
      </h2>
      <div className='grid grid-cols-4 gap-4 align-center text-center p-4 rounded-lg shadow-md mt-4'>
        <div className='border border-gray-300 rounded p-4 mt-4'>
          <p>
            <strong>Name:</strong> {customer?.first_name} {customer?.last_name}
          </p>
          <p>
            <strong>Notes:</strong> {customer?.notes}
          </p>
        </div>
        {/* <div className='border border-gray-300 rounded p-4 mt-4'>
          <h3 className='text-lg font-bold'>Phone Numbers</h3>
          <ul>
            {phones.map((phone) => (
              <li key={phone.id}>
                <strong>{phone.type}:</strong> {phone.number}
              </li>
            ))}
          </ul>
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
        </div> */}
        {/* </div> */}
        {/* <div className='gap-4 align-center text-center p-4 rounded-lg shadow-md mt-4'> */}
        <h3 className='text-lg font-bold'>Car</h3>
        <div>
          {car.year} {car.make} {car.car_model}
        </div>
      </div>
      {/* </div> */}
    </>
  );
}
