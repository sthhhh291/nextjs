import prisma from "@/lib/db";
// import { customers } from "@prisma/client";
import CustomerList from "./components/customers/CustomerList";
// import Link from "next/link";

export default async function Home() {
  const customersList  = await prisma.customers.findMany({take:20});
  // console.log(customersList);
  return (
    <div className="m-6 p-6">
      <CustomerList customersList={customersList} />
    </div>
  );
}
