// import Login from "@/app/ui/login";
// import Navbar from "./navbar";
import { CustomerSearch } from "./ui/customer-search";

export default function Home() {
  // main page where customer and cars can be searched
  return (
    <div className='flex flex-col items-center min-h-screen py-2'>
      {/* <Navbar /> */}
      <h2 className='text-xl font-bold bg-center'>Search Customers and Cars</h2>
      {/* customer and car search functionality would go here */}
      <div className='flex flex-row  justify-center w-full flex-1 px-20 text-center'>
        <CustomerSearch />
        {/* CarSearch here */}
        <CustomerSearch />
      </div>
    </div>
  );
}
