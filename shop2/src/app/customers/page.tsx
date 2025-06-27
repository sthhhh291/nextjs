import SearchCustomers from "@/lib/components/SearchCustomers";
import { getCustomers } from "@/lib/db/customers";
import AddCustomer from "./AddCustomer";

interface CustomersPageProps {
  searchParams: {
    filter?: string;
    limit?: number;
    page?: number;
    [key: string]: unknown;
  };
}

export default async function CustomersPage({
  searchParams,
}: CustomersPageProps) {
  await searchParams;
  const filter = searchParams.filter || "";
  const limit = searchParams.limit || 20;
  const page = searchParams.page || 1;
  const data = await getCustomers(filter, limit, page);
  const customers = data.customers;
  return (
    <div>
      <div>
        <SearchCustomers query={filter} />
        <AddCustomer />
        {customers.map((customer, index) => (
          <p key={index}>
            {customer.first_name} {customer.last_name} {customer.notes}
          </p>
        ))}
      </div>
    </div>
  );
}
