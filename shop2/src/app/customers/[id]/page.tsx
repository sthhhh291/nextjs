import {
  getCustomer,
  getCustomerCars,
  getCustomerPhones,
  createCustomer,
  editCustomer,
  deleteCustomer,
} from "@/lib/db/customers";
// import Table from "@/lib/components/Table";
import Button from "@/lib/components/Button";
import CustomerCard from "./CustomerCard";
// import Phones from "./Phones";
import Cars from "./Cars";
// import Card from "@/lib/components/Card";
// import CardList from "@/lib/components/CardList";

const CustomerPage = async ({ params }: { params: customer }) => {
  const { id } = await params;
  const customer = await getCustomer(id);
  const cars: car[] = await getCustomerCars(id);
  const phones: phone[] = await getCustomerPhones(id);

  return (
    <div className=''>
      <h2 className='max-w-md mx-auto  p-6'>Customer:</h2>
      <CustomerCard customer={customer} phones={phones} />
      {/* <Card
        title={`${customer.first_name} ${customer.last_name}`}
        description=''
      /> */}
      {/* <CardList
        items={phones.map((phone) => ({
          id: phone.id,
          title: phone.phone_number,
          description: phone.phone_type,
        }))}
      /> */}
      <h2 className='max-w-md mx-auto p-6'>Cars:</h2>
      <Cars cars={cars} />
      {/* <Phones phones={phones} /> */}

      {/* <Table
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
      /> */}
      <form
        action={async () => {
          "use server";
          await editCustomer(5530, "testedit", "lastedit", "test notes edit");
        }}>
        <Button>Edit Test Customer</Button>
      </form>
      <form
        action={async () => {
          "use server";
          await deleteCustomer(5530);
        }}>
        <Button>Delete test Customer</Button>
      </form>
      <form
        action={async () => {
          "use server";
          await createCustomer("test", "last", "test notes");
        }}>
        <Button>Add Test Customer</Button>
      </form>
    </div>
  );
};
export default CustomerPage;
