import {
  getCarById,
  getEstimatesByCarId,
} from "@/actions/car";
import { getCustomerById } from "@/actions/customer";
import type { Customer, Car, Estimate } from "@/types";
import CustomerDetail from "../../ui/customer-detail";
import { Card, CardHeader} from "@/components/ui/card";
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
        <CarDetail car={car} />
        Engine: {car.engine} <br />
        Vin: {car.vin}
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
