import prisma from "@/lib/db";
// import { customers } from "@prisma/client";
import CustomerList from "./components/customers/CustomerList";
// import Link from "next/link";

export default async function Home(props:{},skip:number=0,take:number=40) {
  const customersList  = await prisma.customers.findMany({take:take,skip:skip});
  // console.log(customersList);
  return (
    <div className="m-6 p-6">
      <label htmlFor="customerSearch" className="text-bold p-2 m-2 ">Filter Customers</label>
      <input className="rounded-md p-2 m-2 text-black" type="text" name="customerSearch" />
      <CustomerList customersList={customersList} />
      <div id="pagination">
        
      </div>
    </div>
  );
}
