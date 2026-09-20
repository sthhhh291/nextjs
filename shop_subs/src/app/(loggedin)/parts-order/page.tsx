import { getPartsOrder } from "@/actions/parts-order";
import type { PartsOrder } from "@/types";
import PartsOrderForm from "../ui/parts-order-form";
import { Button } from "@/components/ui/button";
import { Trash } from "lucide-react";

export default async function PartsOrdersPage() {
  const orders: PartsOrder[] = await getPartsOrder();
  return (
    <>
      {/* create form here */}
      <h2>Add an markup here</h2>
      <PartsOrderForm order={null} />
      {/* array of edit forms here */}
      <h2>View/Edit existing markups here</h2>
      {orders.map((emp) => (
        <div key={emp.id}>
          <PartsOrderForm order={emp} />
          {/* <Button>
            <Trash />
          </Button> */}
        </div>
      ))}
    </>
  );
}
