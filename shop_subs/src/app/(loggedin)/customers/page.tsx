import CustomerSearch from "@/app/(loggedin)/ui/customer-search";

export default function CustomersPage() {
  return (
    <section className='space-y-6'>
      <header className='space-y-1'>
        <h1 className='text-2xl font-semibold'>Customers</h1>
        <p className='text-sm text-muted-foreground'>
          Search customer records and manage their vehicles and contact details.
        </p>
      </header>
      <CustomerSearch />
    </section>
  );
}
