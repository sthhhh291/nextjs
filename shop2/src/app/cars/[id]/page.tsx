import { getcar, getCarRepairs } from "@/lib/db/cars";
import { getCustomer, getCustomerPhones } from "@/lib/db/customers";
import Table from "@/lib/components/Table";
import CustomerCard from "@/app/customers/[id]/CustomerCard";
import Card from "@/lib/components/Card";
import SearchList from "@/lib/components/SearchList";

type carProps = {
  id: number;
};

const CarPage = async ({ params }: { params: carProps }) => {
  const { id } = await params;
  const car = await getcar(id);
  // const car: car = car_data.car;
  const customer = await getCustomer(car.customer_id);
  const phones = await getCustomerPhones(car.customer_id);
  const repairs = await getCarRepairs(id);
  // const estimates: estimate[] = await get_car_estimates(id);
  // const repairs: estimate[] = await get_car_repairs(id);

  return (
    <div className='flex flex-col items-center justify-center min-h-screen p-8'>
      <h1 className='text-2xl font-bold mb-4'>Car Details</h1>
      <CustomerCard customer={customer} phones={phones} />
      {/* <Table
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
      /> */}
      <Card
        title={`${car.year} ${car.make} ${car.model}`}
        description={`${car.engine} ${car.vin} ${car.license} ${car.fleet_no}`}
      />
      <SearchList
        items={repairs.map((car) => ({
          id: car.id,
          title: `${car.date} ${car.miles} ${car.hours_taken}`,
          href: `/repairs/${car.id}`,
        }))}
      />
      {/* <Table
        data={[car]}
        keyField={"id"}
        columns={[
          { key: "year", header: "Year" },
          { key: "make", header: "Make" },
          { key: "model", header: "Model" },
        ]}
      /> */}
      {/* <Table
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
      /> */}
    </div>
  );
};
export default CarPage;
