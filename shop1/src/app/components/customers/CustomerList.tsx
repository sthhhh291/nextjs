import { customers } from "@prisma/client";
import Link from "next/link";
import CustomerSearchCard from "./CustomerSearchCard";

export default async function CustomerList(props: { customersList: customers[] }) {
    
    return (
    //   <div>
        <div className="grid grid-cols-5 gap-4 items-center">
          {props.customersList.map((cus:customers) => 
            <CustomerSearchCard key={cus.id} customer={cus} />
            )}
        </div>
    //   </div>
    );
  }