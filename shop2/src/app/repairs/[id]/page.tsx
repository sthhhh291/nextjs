import {
  get_repair_order,
  get_repair_order_customer,
  get_repair_order_car,
  get_repair_order_labor,
  get_repair_order_parts,
  get_repair_order_oil,
  get_repair_order_totals,
  get_repair_order_phones,
} from "@/lib/api/repairs";
import Table from "@/lib/components/Table";

type repairProps = {
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

type labor = {
  id: number;
  description: string;
  hours: number;
  price: number;
};

type part = {
  id: number;
  description: string;
  quantity: number;
  cost: number;
  list: number;
  price: number;
  total: number;
};

type total = {
  labor: number;
  parts: number;
  oil: number;
  subtotal: number;
  tax: number;
  shop_fees: number;
  total: number;
  cost: number;
  margin: number;
  parts_margin: number;
};

const RepairPage = async ({ params }: { params: repairProps }) => {
  const { id } = await params;
  const repair_data: estimate = await get_repair_order(id);
  const repair: estimate = repair_data;
  // console.log("data", repair_data, "repair", repair);
  const car: car = await get_repair_order_car(id);
  const customer: customer = await get_repair_order_customer(id);
  const phones: phone[] = await get_repair_order_phones(id);
  const labor: labor[] = await get_repair_order_labor(id);
  const parts: part[] = await get_repair_order_parts(id);
  const oil: part[] = await get_repair_order_oil(id);
  const totals: total = await get_repair_order_totals(id);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-8">
      <div className="grid grid-cols-4">
        <Table
          title="Repair Order Details"
          headers={["ID", "Date", "Miles", "Hours Taken"]}
          rows={[
            [
              String(repair.id),
              repair.date.toString().substring(0, 10),
              String(repair.miles),
              String(repair.hours_taken),
            ],
          ]}
        />
        <Table
          title="Customer Details"
          headers={["First Name", "Last Name"]}
          rows={[[`${customer.first_name}`, `${customer.last_name}`]]}
        />
        <Table
          title="Phone Detail"
          headers={["Number", "Type"]}
          rows={phones.map((phone) => [phone.phone_number, phone.phone_type])}
        />
        <Table
          title="Car Details"
          headers={["Year", "Make", "Model", "Engine", "Vin"]}
          rows={[[`${car.year}`, `${car.make}`, `${car.model}`]]}
        />
        <Table
          title="Labor Details"
          headers={["Description", "Price"]}
          rows={labor.map((l) => [l.description, String(l.price)])}
        />
        <Table
          title="Parts Detail"
          headers={["Description", "Quantity", "Cost", "Price", "Total"]}
          rows={parts.map((part) => [
            part.description,
            String(part.quantity),
            String(part.cost),
            String(part.price),
            String(part.price * part.quantity),
          ])}
        />
        <Table
          title="Oil Details"
          headers={[
            "Description",
            "Quantity",
            "Cost",
            "List",
            "Price",
            "Total",
          ]}
          rows={oil.map((oil) => [
            oil.description,
            String(oil.quantity),
            String(oil.cost),
            String(oil.list),
            String(oil.price),
            String(oil.price * oil.quantity),
          ])}
        />
        <Table
          title="Totals"
          headers={[
            "Labor",
            "Parts",
            "Oil",
            "Subtotal",
            "Tax",
            "Shop Fees",
            "Total",
            "Cost",
            "Margin",
            "Parts Margin",
          ]}
          rows={[
            [
              String(totals.labor),
              String(totals.parts),
              String(totals.oil),
              String(totals.subtotal),
              String(totals.tax),
              String(totals.shop_fees),
              String(totals.total),
              String(totals.cost),
              String(totals.margin),
              String(totals.parts_margin),
            ],
          ]}
        />
      </div>
    </div>
  );
};
export default RepairPage;
