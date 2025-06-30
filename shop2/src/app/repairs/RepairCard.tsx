import { getrepair, getrepairSubs, getrepairTotals } from "@/lib/db/repairs";
import { getcar } from "@/lib/db/cars";
import { getCustomer } from "@/lib/db/customers";
// type repairProps = {
//   id: number;
// };

export default async function RepairCard({ id }: { id: number }) {
  const repair = await getrepair(id);
  const subs = await getrepairSubs(id);
  const labor = subs.labor;
  const parts = subs.parts;
  const oil = subs.oil;
  const totals = await getrepairTotals(id);
  const car = await getcar(repair.car_id);
  const customer = await getCustomer(car.customer_id);
  //   console.log("id", id, "repair", repair);
  return (
    <div className="border p-4 rounded shadow-md hover:bg-blue-200 transition-shadow duration-300">
      {/* <Link href={href}> */}
      <h2 className="text-xl font-bold mb-2">
        {customer.first_name} {customer.last_name}
      </h2>
      <h2 className="text-xl font-bold mb-2">
        {car.year} {car.make} {car.model}
      </h2>
      <h2 className="text-xl font-bold mb-2">{repair.date.toString()}</h2>
      <p className="text-gray-700">{repair.miles}</p>
      <h2 className="text-xl font-bold mb-2">Labor:</h2>
      {labor.map((lab, index) => (
        <p className="text-gray-700" key={index}>
          {lab.description} {lab.price}
        </p>
      ))}
      <h2 className="text-xl font-bold mb-2">Labor:</h2>
      {parts.map((part, index) => (
        <p className="text-gray-700" key={index}>
          {part.description} {part.quantity} {part.cost} {part.price}
        </p>
      ))}
      <h2 className="text-xl font-bold mb-2">Oil</h2>
      {oil.map((part, index) => (
        <p className="text-gray-700" key={index}>
          {part.description} {part.quantity} {part.cost} {part.price}
        </p>
      ))}
      <h2 className="text-xl font-bold mb-2">Totals</h2>
      {totals.labor} {totals.parts} {totals.oil} {totals.total}
    </div>
  );
}
