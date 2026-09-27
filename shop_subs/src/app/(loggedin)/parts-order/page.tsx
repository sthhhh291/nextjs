import { getPartsOrder } from "@/actions/parts-order";
import type { PartsOrder } from "@/types";
import PartsOrderForm from "../ui/parts-order-form";

export default async function PartsOrdersPage() {
  const orders: PartsOrder[] = await getPartsOrder();
  return (
    <section className='space-y-6'>
      <header className='space-y-1'>
        <h1 className='text-2xl font-semibold'>Parts orders</h1>
        <p className='text-sm text-muted-foreground'>
          Add and maintain parts order records.
        </p>
      </header>
      <div className='space-y-3'>
        <h2 className='text-base font-semibold'>Add order</h2>
        <PartsOrderForm order={null} />
      </div>
      <div className='space-y-3'>
        <h2 className='text-base font-semibold'>Existing orders</h2>
        <div className='grid gap-3'>
          {orders.map((order) => (
            <PartsOrderForm key={order.id} order={order} />
          ))}
        </div>
      </div>
    </section>
  );
}
