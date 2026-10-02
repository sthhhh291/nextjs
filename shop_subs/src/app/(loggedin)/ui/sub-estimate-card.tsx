"use client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import LaborForm from "@/app/(loggedin)/ui/labor-form";
import PartForm from "@/app/(loggedin)/ui/part-form";
import { Sub_estimate } from "@/types";
import { deletePart } from "@/actions/parts";
import { deleteLabor } from "@/actions/labor";
import { deleteOil } from "@/actions/oil";
import { Button } from "@/components/ui/button";
import { Trash } from "lucide-react";
import OilForm from "./oil-form";
import { formatCurrency } from "@/lib/utils";

export default function SubEstimateCard(params: { sub: Sub_estimate }) {
  const sub = params.sub;
  function handleDeletePart(id: number) {
    const conf = confirm("Are you sure you want to delete this part?");
    if (conf) {
      deletePart(id, sub.id);
    }
  }
  function handleDeleteLabor(id: number) {
    const conf = confirm("Are you sure you want to delete this labor item?");
    if (conf) {
      deleteLabor(id, sub.id);
    }
  }
  function handleDeleteOil(id: number) {
    const conf = confirm("Are you sure you want to delete this oil item?");
    if (conf) {
      deleteOil(id, sub.id);
    }
  }
  return (
    <Card className='min-w-0'>
      <CardHeader className='border-b'>
        <div className='flex flex-wrap items-start justify-between gap-3'>
          <CardTitle>{sub.description}</CardTitle>
          <div className='flex flex-wrap gap-2'>
            <LaborForm labor={null} sub_id={sub.id} />
            <PartForm part={null} sub_id={sub.id} />
            <OilForm oil={null} sub_id={sub.id} />
          </div>
        </div>
      </CardHeader>
      <CardContent className='space-y-5 pt-5'>
        <section className='space-y-2'>
          <h3 className='text-sm font-semibold'>Labor</h3>
          <div className='divide-y rounded-lg border'>
            {sub.labor?.map((labor) => (
              <div
                key={labor.id}
                className='flex flex-wrap items-center justify-between gap-3 px-3 py-2.5'>
                <div className='min-w-0 flex-1'>
                  <p className='text-sm font-medium'>{labor.description}</p>
                  <p className='text-xs text-muted-foreground'>
                    {labor.hours} hours at {labor.rate}
                  </p>
                </div>
                <div className='flex items-center gap-1'>
                  <span className='mr-1 text-sm font-medium'>
                    {formatCurrency(labor.price)}
                  </span>
                  <LaborForm labor={labor} sub_id={sub.id} />
                  <Button
                    type='button'
                    variant='ghost'
                    size='icon-sm'
                    aria-label='Delete labor item'
                    title='Delete labor item'
                    className='text-destructive hover:bg-destructive/10 hover:text-destructive'
                    onClick={() => handleDeleteLabor(labor.id)}>
                    <Trash aria-hidden='true' />
                  </Button>
                </div>
              </div>
            ))}
            {!sub.labor?.length && (
              <p className='px-3 py-3 text-sm text-muted-foreground'>
                No labor items.
              </p>
            )}
          </div>
          <p className='text-right text-sm text-muted-foreground'>
            Labor total: {formatCurrency(sub.totals?.labor_total)}
          </p>
        </section>
        <section className='space-y-2'>
          <h3 className='text-sm font-semibold'>Parts</h3>
          <div className='divide-y rounded-lg border'>
            {sub.parts?.map((part) => (
              <div
                key={part.id}
                className='flex flex-wrap items-center justify-between gap-3 px-3 py-2.5'>
                <div className='min-w-0 flex-1'>
                  <p className='text-sm font-medium'>{part.description}</p>
                  <p className='text-xs text-muted-foreground'>
                    Qty {part.quantity} at {part.price} | Extended{" "}
                    {formatCurrency(part.quantity * part.price)}
                  </p>
                </div>
                <div className='flex items-center gap-1'>
                  <PartForm part={part} sub_id={sub.id} />
                  <Button
                    type='button'
                    variant='ghost'
                    size='icon-sm'
                    aria-label='Delete part'
                    title='Delete part'
                    className='text-destructive hover:bg-destructive/10 hover:text-destructive'
                    onClick={() => handleDeletePart(part.id)}>
                    <Trash aria-hidden='true' />
                  </Button>
                </div>
              </div>
            ))}
            {!sub.parts?.length && (
              <p className='px-3 py-3 text-sm text-muted-foreground'>
                No parts.
              </p>
            )}
          </div>
          <p className='text-right text-sm text-muted-foreground'>
            Parts total: {formatCurrency(sub.totals?.parts_total)}
          </p>
        </section>
        <section className='space-y-2'>
          <h3 className='text-sm font-semibold'>Oil and fluids</h3>
          <div className='divide-y rounded-lg border'>
            {sub.oil?.map((oil) => (
              <div
                key={oil.id}
                className='flex flex-wrap items-center justify-between gap-3 px-3 py-2.5'>
                <div className='min-w-0 flex-1'>
                  <p className='text-sm font-medium'>{oil.description}</p>
                  <p className='text-xs text-muted-foreground'>
                    Qty {oil.quantity} at {formatCurrency(oil.price)} | Extended{" "}
                    {formatCurrency(oil.quantity * oil.price)}
                  </p>
                </div>
                <div className='flex items-center gap-1'>
                  <OilForm oil={oil} sub_id={sub.id} />
                  <Button
                    type='button'
                    variant='ghost'
                    size='icon-sm'
                    aria-label='Delete oil item'
                    title='Delete oil item'
                    className='text-destructive hover:bg-destructive/10 hover:text-destructive'
                    onClick={() => handleDeleteOil(oil.id)}>
                    <Trash aria-hidden='true' />
                  </Button>
                </div>
              </div>
            ))}
            {!sub.oil?.length && (
              <p className='px-3 py-3 text-sm text-muted-foreground'>
                No oil items.
              </p>
            )}
          </div>
          <p className='text-right text-sm text-muted-foreground'>
            Oil total: {formatCurrency(sub.totals?.oil_total)}
          </p>
        </section>
        <dl className='grid gap-3 rounded-lg bg-muted/50 p-3 text-sm sm:grid-cols-2'>
          <div>
            <dt className='text-muted-foreground'>Subtotal</dt>
            <dd className='mt-1 font-medium'>{formatCurrency(sub.totals?.sub_total)}</dd>
          </div>
          <div>
            <dt className='text-muted-foreground'>Tax</dt>
            <dd className='mt-1 font-medium'>{formatCurrency(sub.totals?.tax)}</dd>
          </div>
          <div>
            <dt className='text-muted-foreground'>Shop fees</dt>
            <dd className='mt-1 font-medium'>{formatCurrency(sub.totals?.shop_fees)}</dd>
          </div>
          <div>
            <dt className='text-muted-foreground'>Total</dt>
            <dd className='mt-1 text-base font-semibold'>
              {formatCurrency(sub.totals?.grand_total)}
            </dd>
          </div>
        </dl>
      </CardContent>
    </Card>
  );
}
