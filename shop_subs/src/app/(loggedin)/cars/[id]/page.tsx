import { getCarById, getCustomerById } from "@/app/actions";
import { notFound } from "next/navigation";
import Link from "next/link";
import type { Customer, Car } from "@/types";
import CustomerDetail from "../../ui/customer-detail";

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
      <div className='grid grid-cols-2 gap-4 align-center text-center p-4 rounded-lg shadow-md mt-4'>
        <CustomerDetail
          customer={customer}
          phones={[]}
          emails={[]}
          addresses={[]}
        />
        <div>
          {car.year} {car.make} {car.car_model} {car.engine && car.engine}{" "}
        </div>
      </div>
    </>
  );
}
