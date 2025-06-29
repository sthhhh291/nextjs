import SearchList from "@/lib/components/SearchList";

const Cars = ({ cars }: { cars: car[] }) => (
  <div className='max-w-md mx-auto bg-white rounded-xl shadow-md overflow-hidden p-6'>
    <SearchList
      items={cars.map((car) => ({
        id: car.id,
        title: `${car.year} ${car.make} ${car.model}`,
        href: `/cars/${car.id}`,
      }))}
    />
    {/* <div className='mb-4'>
      {cars.map((car, index) => (
        <h2 key={index} className='text-xl font-bold text-gray-900'>
          {car.year} {car.make} {car.model}
        </h2>
      ))}
    </div> */}
  </div>
);

export default Cars;
