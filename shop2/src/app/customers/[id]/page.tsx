import {
  get_customer,
  get_customer_cars,
  get_customer_phones,
} from "@/lib/api/customers";
import Table from "@/lib/components/Table";
import CustomerTable from "@/lib/components/customers/CustomerTable";

type customerProps = {
  id: number;
};

type customer = {
  id: number;
  first_name: string;
  last_name: string;
  notes: string;
  "First Name": string;
  "Last Name": string;
  href?: string;
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
    <div className='flex flex-col-3 '>
      {/* <Table
        title='Customer'
        rows={[
          {
            "First Name": customer.first_name,
            "Last Name": customer.last_name,
          },
        ]}
      /> */}
      <CustomerTable
        customers={[
          {
            "First Name": customer.first_name,
            "Last Name": customer.last_name,
            href: `/customers/${customer.id}`,
          },
        ]}
      />
      <Table
        title='Phones'
        rows={phones.map((phone) => ({
          Number: phone.phone_number,
          Type: phone.phone_type,
        }))}
      />
      <Table
        title='Car'
        rows={cars.map((car) => ({
          Year: car.year,
          Make: car.make,
          Model: car.model,
          Engine: car.engine,
          Vin: car.vin,
          Fleet: car.fleet_no,
        }))}
      />
    </div>
  );
};
export default CustomerPage;
