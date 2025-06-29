import SearchCustomers from "@/lib/components/SearchCustomers";
import { getCustomers } from "@/lib/db/customers";
// import Pagination from "../Pagination";
import SearchList from "../SearchList";
// import AddCustomer from "./CustomerForm";

interface CustomersPageProps {
  searchParams: {
    customerFilter: string;
    limit: number;
    page: number;
    [key: string]: unknown;
  };
}

export default async function CustomerSearch({
  searchParams,
}: CustomersPageProps) {
  const { customerFilter } = searchParams;
  const { limit } = searchParams;
  const { page } = searchParams;
  const data = await getCustomers(customerFilter, limit, page);
  const customers = data.customers;
  // const totals = data.totals;

  return (
    <div className='flex flex-col items-center min-h-screen p-8'>
      <SearchCustomers query={customerFilter} />
      {/* <Pagination
        total={totals.total}
        per_page={totals.per_page}
        page={totals.page}
        next_page={totals.next_page}
        prev_page={totals.prev_page}
        pages={totals.pages}
        onPageChange={handlePageChange}
      /> */}
      <SearchList
        items={customers.map((customer) => ({
          id: customer.id,
          title: `${customer.first_name} ${customer.last_name}`,
          description: customer.notes,
          href: `/customers/${customer.id}`,
        }))}
      />
    </div>
  );
}

// export default CustomerSearch;
