import Login from "@/app/ui/login";

export default function Home() {
  // main page where customer and cars can be searched
  return (
    <div className='flex flex-col items-center min-h-screen py-2'>
      <h2 className='text-xl font-bold bg-center'>Search Customers and Cars</h2>
      <Login />
    </div>
  );
}
