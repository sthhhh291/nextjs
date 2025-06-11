import { get_customers } from "@/lib/api/customers";

type customer = {
  id: number;
  first_name: string;
  last_name: string;
  notes: string;
};

export default async function Home() {
  const data = await get_customers("fre", 1, 20);
  const customers: customer[] = data.customers;
  // console.log("customers", customers, "data", data);
  return (
    <div className='grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]'>
      <main className='flex flex-col gap-[32px] row-start-2 items-center sm:items-start'>
        <div>Home page.</div>
        {/* delete later */}
        {customers.map((customer) => (
          <div key={customer.id} className='flex gap-[8px]'>
            <span className='text-[16px] font-semibold'>
              {customer.first_name}
            </span>
            <span className='text-[16px] font-semibold'>
              {customer.last_name}
            </span>
            <span className='text-[16px] font-semibold'>{customer.notes}</span>
          </div>
        ))}
      </main>
      <footer className='row-start-3 flex gap-[24px] flex-wrap items-center justify-center'></footer>
    </div>
  );
}
