import {
  getCustomerById,
  getCustomerPhones,
  getCustomerEmails,
  getCustomerAddresses,
  getCustomerCars,
} from "@/actions/customer";
import type { Customer, Phone, Email, Address, Car } from "@/types";
import CustomerDetail from "@/app/(loggedin)/ui/customer-detail";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default async function CustomerPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const customerId = Number(id);
  const customerPromise: Promise<Customer> = getCustomerById(customerId);
  const phonesPromise: Promise<Phone[]> = getCustomerPhones(customerId);
  const emailsPromise: Promise<Email[]> = getCustomerEmails(customerId);
  const addressesPromise: Promise<Address[]> = getCustomerAddresses(customerId);
  const carsPromise: Promise<Car[]> = getCustomerCars(customerId);

  const [customer, phones, emails, addresses, cars] = await Promise.all([
    customerPromise,
    phonesPromise,
    emailsPromise,
    addressesPromise,
    carsPromise,
  ]);

  // if (!customer) {
  //   notFound();
  // }

  return (
    <section className='grid min-w-0 gap-6 lg:grid-cols-[minmax(0,1.5fr)_minmax(16rem,0.7fr)]'>
      <div className='min-w-0'>
        <CustomerDetail
          customer={customer}
          emails={emails}
          phones={phones}
          addresses={addresses}
        />
      </div>
      <div className='min-w-0'>
        <Card>
          <CardHeader>
            <CardTitle>Vehicles</CardTitle>
          </CardHeader>
          <CardContent className='grid gap-2'>
            {cars.map((car) => (
              <Button
                key={car.id}
                variant='outline'
                className='h-auto w-full justify-start py-2 text-left'
                render={<Link href={`/cars/${car.id}`} />}>
                {car.year} {car.make} {car.car_model}
              </Button>
            ))}
          </CardContent>
        </Card>
      </div>
    </section>
  );
}
