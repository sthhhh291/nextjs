import {
  getCarById,
  getCustomerById,
  getEstimatesByCarId,
} from "@/app/actions";
import { notFound } from "next/navigation";
import Link from "next/link";
import type { Customer, Car, Estimate } from "@/types";
import CustomerDetail from "../../ui/customer-detail";
import { Card, CardHeader, CardContent } from "@/components/ui/card";
import CarForm from "../../ui/car-form";
import CarDetail from "@/app/(loggedin)/ui/car-detail";

export default async function CustomerPage({
  params,
}: {
  params: { id: string };
}) {
  const carId = Number((await params).id);
  const car: Car = await getCarById(carId);
  const customer: Customer = await getCustomerById(car.customer_id);
  const estimates: Estimate[] = await getEstimatesByCarId(carId);
  //   let phones: Phone[] = [];
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
          phones={[]}
          emails={[]}
          addresses={[]}
        />
        {/* <Card> */}
        {/* car detail */}
        <CarDetail car={car} />
        {/* <CardHeader className='text-2xl'>
            {car.year} {car.make} {car.car_model}
            <CarForm car={car} customer_id={car.customer_id} />
          </CardHeader> */}
        {/* <CardContent className='text-2xl'> */}
        Engine: {car.engine} <br />
        Vin: {car.vin}
        {/* </CardContent> */}
        {/* </Card>/ */}
        {estimates &&
          estimates.map((estimate) => (
            <Card key={estimate.id}>
              <CardHeader>{estimate.date}</CardHeader>
            </Card>
          ))}
      </div>
    </>
  );
}
