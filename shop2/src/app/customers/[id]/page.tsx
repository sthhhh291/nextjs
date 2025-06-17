import {
  get_customer,
  get_customer_cars,
  get_customer_phones,
} from "@/lib/api/customers";
import Table from "@/lib/components/Table";

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
  engine: string;
  vin: string;
  fleet_no: string;
  notes: string;
};

type phone = {
  id: number;
  phone_number: string;
  phone_type: string;
};

const CustomerPage = async ({ params }: { params: customerProps }) => {
  const { id } = await params;
  console.log("id", id);
  const customer_data = await get_customer(id);
  const customer: customer = customer_data.customer;
  const cars: car[] = await get_customer_cars(id);
  const phones: phone[] = await get_customer_phones(id);

  return (
    <div className="flex flex-col-3 ">
      <Table
        title="Customer"
        headers={["First Name", "Last Name"]}
        rows={[
          {
            "First Name": customer.first_name,
            "Last Name": customer.last_name,
          },
        ]}
      />
      <Table
        title="Phones"
        headers={["Number", "Type"]}
        rows={phones.map((phone) => [
          "Number":phone.phone_number,
          String(phone.phone_type),
        ])}
      />
      <Table
        title="Car"
        headers={["Year", "Make", "Model", "Engine", "Vin", "Fleet"]}
        rows={cars.map((car) => [
          String(car.year),
          String(car.make),
          String(car.model),
          String(car.engine),
          String(car.vin),
          String(car.fleet_no),
        ])}
      />
    </div>
  );
};
export default CustomerPage;
