import CarSearch from "@/lib/components/CarSearch";
import CustomerSearch from "@/lib/components/customers/CustomerSearch";
import CustomerForm from "./customers/CustomerForm";

export default async function Home() {
  // const carsTotal = await get_cars("fre", "", 1, 20);
  // const cars: car[] = carsTotal.cars;
  return (
    <div className="">
      <main className="grid grid-cols-1 md:grid-cols-3 gap-[24px] p-[24px]">
        <CustomerSearch />
        <CarSearch />
        <CustomerForm />
        <div>Estimate search here</div>
        {/* delete later */}
      </main>
      <footer className="row-start-3 flex gap-[24px] flex-wrap items-center justify-center"></footer>
    </div>
  );
}
