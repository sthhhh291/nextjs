// import { getrepair } from "@/lib/db/repairs";
// import Table from "@/lib/components/Table";
// import Card from "@/lib/components/Card";
import RepairCard from "../RepairCard";

type repairProps = {
  id: number;
};

// type total = {
//   labor: number;
//   parts: number;
//   oil: number;
//   subtotal: number;
//   tax: number;
//   shop_fees: number;
//   total: number;
//   cost: number;
//   margin: number;
//   parts_margin: number;
// };

const RepairPage = async ({ params }: { params: repairProps }) => {
  const { id } = await params;
  // const repair: estimate = await getrepair(id);
  // const repair: estimate = repair_data;
  // console.log("data", repair_data, "repair", repair);
  // const car: car = await get_repair_order_car(id);
  // const customer: customer = await get_repair_order_customer(id);
  // const phones: phone[] = await get_repair_order_phones(id);
  // const labor: labor[] = await get_repair_order_labor(id);
  // const parts: part[] = await get_repair_order_parts(id);
  // const oil: part[] = await get_repair_order_oil(id);
  // const totals: total = await get_repair_order_totals(id);

  return (
    <div>
      <RepairCard id={id} />
    </div>
  );
};
export default RepairPage;
