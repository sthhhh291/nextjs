import { CustomerSearch } from "@/app/ui/customer-search";

export default function CustomersPage() {
  return (
    <div className='flex flex-col items-center min-h-screen py-2'>
      <h2 className='text-xl font-bold bg-center'>Customers</h2>
      <CustomerSearch />
    </div>
  );
}
