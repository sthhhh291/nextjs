import CustomerSearch from "@/app/(loggedin)/ui/customer-search";
import CarSearch from "@/app/(loggedin)/ui/car-search";

export default function Home() {
  return (
    <section className='space-y-6'>
      <header className='space-y-1'>
        <h1 className='text-2xl font-semibold'>Shop Desk</h1>
        <p className='text-sm text-muted-foreground'>
          Find a customer or vehicle to get started.
        </p>
      </header>
      <div className='grid min-w-0 gap-6 lg:grid-cols-2'>
        <CustomerSearch />
        <CarSearch />
      </div>
    </section>
  );
}
