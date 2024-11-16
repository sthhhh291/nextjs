import { customers } from "@prisma/client";

export default async function CustomerList(props: { customersList: customers[] }) {
    
    return (
    //   <div>
        <ul>
          {props.customersList.map((cus:customers) => 
            <li key={cus.id} >{cus.first_name} {cus.last_name}</li>
            )}
        </ul>
    //   </div>
    );
  }