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
  params: { id: string };
}) {
  const customerId = Number((await params).id);
  let customer: Customer | null = null;
  let phones: Phone[] = [];
  let emails: Email[] = [];
  let addresses: Address[] = [];
  let cars: Car[] = [];

  try {
    customer = await getCustomerById(customerId);
    phones = await getCustomerPhones(customerId);
    emails = await getCustomerEmails(customerId);
    addresses = await getCustomerAddresses(customerId);
    cars = await getCustomerCars(customerId);
  } catch (error) {
    console.error("Error fetching customer:", error);
    notFound();
  }

  if (!customer) {
    notFound();
  }

  return (
    <div className='grid grid-cols-4 gap-4 align-center text-center p-4 rounded-lg shadow-md mt-4 justify-center'>
      <CustomerDetail
        customer={customer}
        emails={emails}
        phones={phones}
        addresses={addresses}
      />
      <div>
        <Card className='col-span-4 p-2 m-2'>
          <h3 className='text-lg font-bold'>Cars</h3>
          <CardContent className='grid grid-cols-1'>
            {cars.map((car) => (
              <Button key={car.id}>
                <Link href={`/cars/${car.id}`} >
                  {car.year} {car.make} {car.car_model}
                </Link>
              </Button>
            ))}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
