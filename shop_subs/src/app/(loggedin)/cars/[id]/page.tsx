import { getCarById, getEstimatesByCarId } from "@/actions/car";
import {
  getCustomerById,
  getCustomerPhones,
  getCustomerEmails,
  getCustomerAddresses,
} from "@/actions/customer";
import type { Customer, Car, Estimate, Phone, Email, Address } from "@/types";
import CustomerDetail from "../../ui/customer-detail";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import CarDetail from "@/app/(loggedin)/ui/car-detail";
import Link from "next/link";
// import { CupSoda } from "lucide-react";

export default async function CustomerPage({
  params,
}: {
  params: { id: string };
}) {
  const carId = Number((await params).id);
  const carPromise: Promise<Car> = getCarById(carId);
  // const car = await carPromise;
  const estimatesPromise: Promise<Estimate[]> = getEstimatesByCarId(carId);
  const [car, estimates] = await Promise.all([carPromise, estimatesPromise]);
  const customerPromise: Promise<Customer> = getCustomerById(car.customer_id);
  const customer = await customerPromise;
  const phonesPromise: Promise<Phone[]> = getCustomerPhones(customer.id);
  const emailsPromise: Promise<Email[]> = getCustomerEmails(customer.id);
  const addressesPromise: Promise<Address[]> = getCustomerAddresses(
    customer.id,
  );
  const [phones, emails, addresses] = await Promise.all([
    phonesPromise,
    emailsPromise,
    addressesPromise,
  ]);

  //   let emails: Email[] = [];
  //   let addresses: Address[] = [];

  return (
    <section className='space-y-6'>
      <header className='space-y-1'>
        <h1 className='text-2xl font-semibold'>Vehicle details</h1>
        <p className='text-sm text-muted-foreground'>
          Vehicle and owner information, with related estimates.
        </p>
      </header>
      <div className='grid min-w-0 gap-6 lg:grid-cols-2'>
        <CustomerDetail
          customer={customer}
          phones={phones}
          emails={emails}
          addresses={addresses}
        />
        <CarDetail car={car} />
        <Card className='lg:col-span-2'>
          <CardHeader>
            <CardTitle>Estimates</CardTitle>
          </CardHeader>
          <CardContent className='grid gap-2 sm:grid-cols-2 lg:grid-cols-3'>
            {estimates &&
              estimates.map((estimate) => (
                <Button
                  key={estimate.id}
                  variant='outline'
                  className='h-auto justify-start py-2 text-left'
                  render={<Link href={`/estimates/${estimate.id}`} />}>
                  {estimate.date}
                </Button>
              ))}
          </CardContent>
        </Card>
      </div>
    </section>
  );
}
