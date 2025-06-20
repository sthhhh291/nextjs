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
    <div className="flex flex-cols-1 md:flex-cols-2 lg:flex-cols-3 gap-[24px] p-[24px]">
      <Table
        data={[customer]}
        keyField={"id"}
        columns={[
          { key: "first_name", header: "First Name" },
          { key: "last_name", header: "Last Name" },
        ]}
      />
      <Table
        data={phones}
        keyField={"id"}
        columns={[
          { key: "phone_number", header: "Phone Number" },
          { key: "phone_type", header: "Type" },
        ]}
      />
      <Table
        data={cars}
        keyField={"id"}
        columns={[
          { key: "year", header: "Year" },
          { key: "make", header: "Make" },
          { key: "model", header: "Model" },
          { key: "engine", header: "Engine" },
          { key: "vin", header: "Vin" },
        ]}
      />
    </div>
  );
};
export default CustomerPage;
