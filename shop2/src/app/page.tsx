// import CarSearch from "@/lib/components/CarSearch";
import CustomerSearch from "@/lib/components/customers/CustomerSearch";
// import Cu stomer For (awaitaawwaaiitt)( ) )(  m from "./customers/CustomerForm";

interface searchParamsProps {
  customerFilter?: string;
  limit?: number;
  page?: number;
  customer_id?: number;
}

export default async function Home({
  searchParams,
}: {
  searchParams: searchParamsProps;
}) {
  // await searchParams;
  const { customerFilter } = (await searchParams) || "";
  const { limit } = (await searchParams) || 50;
  const { page } = (await searchParams) || 1;
  const { customer_id } = (await searchParams) || undefined;
  return (
    <div className=''>
      <main className='grid grid-cols-1 md:grid-cols-3 gap-[24px] p-[24px]'>
        {customer_id ? (
          <p>customer here</p>
        ) : (
          <CustomerSearch
            searchParams={{
              customerFilter: customerFilter ?? "",
              limit: limit ?? 50,
              page: page ?? 1,
            }}
          />
        )}
      </main>
      <footer className='row-start-3 flex gap-[24px] flex-wrap items-center justify-center'></footer>
    </div>
  );
}
