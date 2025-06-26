import {
  getCustomer,
  getCustomerCars,
  getCustomerPhones,
  createCustomer,
  editCustomer,
  deleteCustomer,
} from "@/lib/db/customers";
import Table from "@/lib/components/Table";
import Button from "@/lib/components/Button";

const CustomerPage = async ({ params }: { params: customer }) => {
  const { id } = await params;
  const customer = await getCustomer(id);
  const cars: car[] = await getCustomerCars(id);
  const phones: phone[] = await getCustomerPhones(id);

  return (
    <div className='flex flex-cols-1 md:flex-cols-2 lg:flex-cols-3 gap-[24px] p-[24px]'>
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
