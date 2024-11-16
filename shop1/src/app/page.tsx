import prisma from "@/lib/db";
// import { customers } from "@prisma/client";
import CustomerList from "./components/CustomerList";
// import Link from "next/link";

export default async function Home() {
  const customersList  = await prisma.customers.findMany({take:20});
  // console.log(customersList);
  return (
    <div className="">
      <CustomerList customersList={customersList} />
    </div>
  );
}
