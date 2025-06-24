// "use client";
import Input from "@/lib/components/Input";
import { getCustomers } from "@/lib/db/customers";
// import { useSearchParams } from "next/navigation";

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
  // console.log("data", data);
  // const totals = data.totals;
  // console.log("totals", totals);
  return (
    <div>
      <div>
        <Input onChange={(e) => console.log(e.target.value)} />
      </div>
      <div>
        {customers.map((customer, index) => (
          <p key={index}>
            {customer.first_name} {customer.last_name} {customer.notes}
          </p>
        ))}
      </div>
    </div>
  );
}
