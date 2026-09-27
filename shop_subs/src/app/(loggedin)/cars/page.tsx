import CarSearch from "@/app/(loggedin)/ui/car-search";

export default function CarsPage() {
  return (
    <section className='space-y-6'>
      <header className='space-y-1'>
        <h1 className='text-2xl font-semibold'>Vehicles</h1>
        <p className='text-sm text-muted-foreground'>
          Search vehicles by customer, year, make, or model.
        </p>
      </header>
      <CarSearch />
    </section>
  );
}
