import { customers } from "@prisma/client";
import Link from "next/link";

export default async function CustomerSearchCard(props: { customer: customers }) {
    
    return (
            <Link key={props.customer.id} href={`/customers/${props.customer.id}`} 
            className="bg-slate-700 rounded-md p-4 text-center hover:bg-slate-500">{props.customer.first_name} {props.customer.last_name}</Link>
    );
  }