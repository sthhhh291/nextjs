import { get_customer, get_customer_cars } from "@/lib/api/customers";
import Card from "@/lib/components/Card";

type customerProps = {
  id: number;
};

type customer = {
  id: number;
  first_name: string;
  last_name: string;
  notes: string;
};

type car = {
  id: number;
  year: string;
  make: string;
  model: string;
  notes: string;
};

const CustomerPage = async ({ params }: { params: customerProps }) => {
  const { id } = await params;
  console.log("id", id);
  const customer_data = await get_customer(id);
  const customer: customer = customer_data.customer;
  const cars: car[] = await get_customer_cars(id);
  //   const cars: car[] = await car_data.cars;
  //   console.log("car_data", car_data);
  //   console.log("cars", cars);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-8">
      <h1 className="text-2xl font-bold mb-4">Customer Details</h1>
      <p className="text-lg">Customer ID: {id}</p>
      <Card
        title={`${customer.first_name} ${customer.last_name}`}
        description={customer.notes}
      />
      {cars.map((car) => (
        <Card
          key={car.id}
          title={`${car.year} ${car.make} ${car.model}`}
          description={car.notes}
        />
      ))}
      {/* Additional customer details can be fetched and displayed here */}
    </div>
  );
};
export default CustomerPage;
