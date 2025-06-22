import {
  get_car,
  get_car_customer,
  get_car_estimates,
  get_car_repairs,
  get_car_phones,
} from "@/lib/api/cars";
import Table from "@/lib/components/Table";

type carProps = {
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

type phone = {
  id: number;
  phone_number: string;
  phone_type: string;
};

type estimate = {
  id: number;
  date: string;
  miles: number;
  hours_taken: number;
  pub_notes: string;
};

const CarPage = async ({ params }: { params: carProps }) => {
  const { id } = await params;
  const car_data = await get_car(id);
  const car: car = car_data.car;
  const customer: customer = await get_car_customer(id);
  const phones: phone[] = await get_car_phones(id);
  const estimates: estimate[] = await get_car_estimates(id);
  const repairs: estimate[] = await get_car_repairs(id);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-8">
      <h1 className="text-2xl font-bold mb-4">Car Details</h1>
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
          { key: "phone_type", header: "Type" },
          { key: "phone_number", header: "Number" },
        ]}
      />
      <Table
        data={[car]}
        keyField={"id"}
        columns={[
          { key: "year", header: "Year" },
          { key: "make", header: "Make" },
          { key: "model", header: "Model" },
        ]}
      />
      <Table
        data={estimates}
        keyField={"id"}
        columns={[
          { key: "date", header: "Date" },
          { key: "pub_notes", header: "Notes" },
        ]}
      />
      <Table
        data={repairs}
        keyField={"id"}
        columns={[
          { key: "date", header: "Date" },
          { key: "pub_notes", header: "Notes" },
        ]}
      />
    </div>
  );
};
export default CarPage;
