import CarSearch from "@/app/(loggedin)/ui/car-search";

export default function CarsPage() {
  return (
    <div className='flex flex-col items-center min-h-screen py-2'>
      <h1>Cars Page</h1>
      <CarSearch />
    </div>
  );
}
