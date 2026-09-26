import {
  getCarById,
  getEstimatesByCarId,
} from "@/actions/car";
import { getCustomerById, getCustomerPhones,getCustomerEmails, getCustomerAddresses } from "@/actions/customer";
import type { Customer, Car, Estimate, Phone, Email, Address } from "@/types";
import CustomerDetail from "../../ui/customer-detail";
import { Card, CardHeader} from "@/components/ui/card";
import CarDetail from "@/app/(loggedin)/ui/car-detail";
import Link from "next/link";

export default async function CustomerPage({
  params,
}: {
  params: { id: string };
}) {
  const carId = Number((await params).id);
  const carPromise: Promise<Car> = getCarById(carId);
  const car = await carPromise;
  const customerPromise:Promise< Customer> = getCustomerById(car.customer_id);
  const estimatesPromise: Promise<Estimate[]> = getEstimatesByCarId(carId);
  const [customer,estimates] = await Promise.all([customerPromise,estimatesPromise])
  const phonesPromise: Promise<Phone[]>=  getCustomerPhones(customer.id);
  const emailsPromise: Promise<Email[]>=  getCustomerEmails(customer.id);
  const addressesPromise: Promise<Address[]>=  getCustomerAddresses(customer.id);
  const [phones,emails,addresses] = await Promise.all([phonesPromise,emailsPromise,addressesPromise])
  
  //   let emails: Email[] = [];
  //   let addresses: Address[] = [];

  return (
    <>
      <h2 className='text-xl font-bold bg-center align-center text-center p-4 rounded-lg shadow-md mt-4'>
        Car Details
      </h2>
      <div className='grid grid-cols-2 gap-4 align-center text-center p-4 rounded-lg shadow-md mt-4'>
        <CustomerDetail
          customer={customer}
          phones={phones}
          emails={emails}
          addresses={addresses}
        />
        <CarDetail car={car} />
        Engine: {car.engine} <br />
        Vin: {car.vin}
        {estimates &&
          estimates.map((estimate) => (
            <Card key={estimate.id}>
              <Link href={`/estimates/${estimate.id}`}>
              <CardHeader>{estimate.date}</CardHeader>
              </Link>
            </Card>
          ))}
      </div>
    </>
  );
}
