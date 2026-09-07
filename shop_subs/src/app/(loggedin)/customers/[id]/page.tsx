import {
  getCustomerById,
  getCustomerPhones,
  getCustomerEmails,
  getCustomerAddresses,
  getCustomerCars,
} from "@/app/actions";
import { notFound } from "next/navigation";
import type { Customer, Phone, Email, Address, Car } from "@/types";
import CustomerDetail from "@/app/(loggedin)/ui/customer-detail";
import CarLine from "../../ui/car-line";
import { Card } from "@/components/ui/card";

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
      {/* <h2 className='text-xl font-bold bg-center align-center text-center p-4 rounded-lg shadow-md mt-4'>
        Customer Details
      </h2> */}
      <CustomerDetail
        customer={customer}
        emails={emails}
        phones={phones}
        addresses={addresses}
      />
      <div>
        <Card className='col-span-4'>
          <h3 className='text-lg font-bold'>Cars</h3>
          <ul>
            {cars.map((car) => (
              <CarLine key={car.id} car={car} />
            ))}
          </ul>
        </Card>
      </div>
    </div>
  );
}
