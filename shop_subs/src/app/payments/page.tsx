// import type { Totals } from "@/types";
import { Totals } from "@/types";
import { columns } from "./columns";
import { DataTable } from "./data-table";
import { getTotalsByRange } from "@/actions/totals";

async function getData(): Promise<Totals[]> {
  // Fetch data from your API here
  const data: Totals[] = await getTotalsByRange("2023-01-01", "2023-12-31");
  return data;
}

export default async function DemoPage() {
  const data = await getData();

  return (
    <div className='container mx-auto py-10'>
      <DataTable columns={columns} data={data} />
    </div>
  );
}
