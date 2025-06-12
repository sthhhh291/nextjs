import { get_cars } from "@/lib/api/cars";
import { get_customers } from "@/lib/api/customers";
import Card from "@/lib/components/Card";

type customer = {
  id: number;
  first_name: string;
  last_name: string;
  notes: string;
};

type car = {
  id: number;
  first_name: string;
  last_name: string;
  vin: string;
  make: string;
  model: string;
  year: number;
  license: string;
  customer_id: number;
  notes: string;
  fleet_no: string;
  engine: string;
};

export default async function Home() {
  const data = await get_customers("fre", 1, 20);
  const customers: customer[] = data.customers;
  const carsTotal = await get_cars("fre", "", 1, 20);
  const cars: car[] = carsTotal.cars;
  // console.log("customers", customers, "data", data);
  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <main className="flex flex-col gap-[32px] row-start-2 items-center sm:items-start">
        <div>Home page.</div>
        {/* delete later */}
        {customers.map((customer) => (
          <Card
            key={customer.id}
            title={`${customer.first_name} ${customer.last_name}`}
            description={customer.notes}
          />
        ))}
        {cars.map((car) => (
          <Card
            key={car.id}
            title={`${car.first_name} ${car.last_name} ${car.year} ${car.make} ${car.model}`}
            description={car.notes}
          />
        ))}
      </main>
      <footer className="row-start-3 flex gap-[24px] flex-wrap items-center justify-center"></footer>
    </div>
  );
}
