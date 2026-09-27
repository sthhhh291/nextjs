import {
  getCustomerById,
  getCustomerPhones,
  getCustomerEmails,
  getCustomerAddresses,
  getCustomerCars,
} from "@/actions/customer";
import { notFound } from "next/navigation";
import type { Customer, Phone, Email, Address, Car } from "@/types";
import CustomerDetail from "@/app/(loggedin)/ui/customer-detail";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default async function CustomerPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
    const { id } = await params;
    const customerId = Number(id);
    const customerPromise:Promise<Customer> = getCustomerById(customerId);
    const phonesPromise:Promise<Phone[]> =  getCustomerPhones(customerId);
    const emailsPromise:Promise<Email[]> =  getCustomerEmails(customerId);
    const addressesPromise:Promise<Address[]> =  getCustomerAddresses(customerId);
    const carsPromise:Promise<Car[]> =  getCustomerCars(customerId);
    
    const [customer,phones,emails,addresses,cars] = await Promise.all([
      customerPromise,phonesPromise,emailsPromise,addressesPromise,carsPromise
    ])

  // if (!customer) {
  //   notFound();
  // }

  return (
    <div className='flex justify-center'>
      <div className="w-1/2">
      <CustomerDetail
        customer={customer}
        emails={emails}
        phones={phones}
        addresses={addresses}
        />
        </div>
      <div className="w-1/4">
        <Card className=''>
          <h3 className='text-lg font-bold'>Cars</h3>
          <CardContent className='grid grid-cols-1'>
            {cars.map((car) => (
                <Link key = {car.id} href={`/cars/${car.id}`} >
              <Button>
                  {car.year} {car.make} {car.car_model}
              </Button>
                </Link>
            ))}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
