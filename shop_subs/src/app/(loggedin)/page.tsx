import CustomerSearch  from '@/app/(loggedin)/ui/customer-search'
import CarSearch from '@/app/(loggedin)/ui/car-search'

export default function Home() {
  return (
    <div className='flex flex-col items-center min-h-screen py-2'>
      <h2 className='text-xl font-bold bg-center'>Search Customers and Cars</h2>
      <div className='flex flex-row  justify-center w-full flex-1 px-20 text-center m-4'>
        <CustomerSearch />
        <CarSearch />
      </div>
    </div>
  );
}
