// type car = {
//   id: number;
//   first_name: string;
//   last_name: string;
//   vin: string;
//   make: string;
//   model: string;
//   year: number;
//   license: string;
//   customer_id: number;
//   notes: string;
//   fleet_no: string;
//   engine: string;
// };

import CustomerSearch from "@/lib/components/CustomerSearch";

export default async function Home() {
  // const carsTotal = await get_cars("fre", "", 1, 20);
  // const cars: car[] = carsTotal.cars;
  // console.log("customers", customers, "data", data);
  return (
    <div className='grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]'>
      <main className='flex flex-col gap-[32px] row-start-2 items-center sm:items-start'>
        <div>Home page.</div>
        <CustomerSearch />
        {/* delete later */}
      </main>
      <footer className='row-start-3 flex gap-[24px] flex-wrap items-center justify-center'></footer>
    </div>
  );
}
