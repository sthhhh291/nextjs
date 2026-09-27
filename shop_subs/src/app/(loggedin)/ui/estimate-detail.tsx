"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import type { Estimate, Totals } from "@/types";
import EstimateForm from "./estimate-form";
import SubForm from "./sub-form";

export default function EstimateDetail(params: {
  estimate: Estimate;
  totals: Totals;
}) {
  const estimate = params.estimate;
  const totals = params.totals;

  return (
    <Card className='min-w-0'>
      <CardHeader className='border-b'>
        <CardTitle>Estimate #{estimate.id}</CardTitle>
      </CardHeader>
      <CardContent className='space-y-5 pt-5'>
        <dl className='grid gap-4 sm:grid-cols-2'>
          <div>
            <dt className='text-xs text-muted-foreground'>Date</dt>
            <dd className='mt-1 text-sm font-medium'>{estimate.date}</dd>
          </div>
          <div>
            <dt className='text-xs text-muted-foreground'>Type</dt>
            <dd className='mt-1 text-sm font-medium'>
              {estimate.estimate_type}
            </dd>
          </div>
          <div>
            <dt className='text-xs text-muted-foreground'>Mileage</dt>
            <dd className='mt-1 text-sm font-medium'>{estimate.mileage}</dd>
          </div>
          <div>
            <dt className='text-xs text-muted-foreground'>Hours</dt>
            <dd className='mt-1 text-sm font-medium'>{estimate.hours}</dd>
          </div>
        </dl>
        <dl>
          <dt className='text-xs text-muted-foreground'>Labor</dt>
          <dd className='mt-1 text-sm font-medium'>{totals.labor_total}</dd>
        </dl>
        <dl>
          <dt className='text-xs text-muted-foreground'>Parts</dt>
          <dd className='mt-1 text-sm font-medium'>{totals.parts_total}</dd>
        </dl>
        <dl>
          <dt className='text-xs text-muted-foreground'>Oil</dt>
          <dd className='mt-1 text-sm font-medium'>{totals.oil_total}</dd>
        </dl>
        <dl>
          <dt className='text-xs text-muted-foreground'>Sub Total</dt>
          <dd className='mt-1 text-sm font-medium'>{totals.sub_total}</dd>
        </dl>
        <dl>
          <dt className='text-xs text-muted-foreground'>Tax</dt>
          <dd className='mt-1 text-sm font-medium'>{totals.tax}</dd>
        </dl>
        <dl>
          <dt className='text-xs text-muted-foreground'>Shop Fees</dt>
          <dd className='mt-1 text-sm font-medium'>{totals.shop_fees}</dd>
        </dl>
        <dl>
          <dt className='text-xs text-muted-foreground'>Total</dt>
          <dd className='mt-1 text-sm font-medium'>{totals.grand_total}</dd>
        </dl>
        <div className='flex flex-wrap gap-2 border-t pt-4'>
          <SubForm sub={null} estimate_id={estimate.id} />
          <EstimateForm estimate={estimate} car_id={estimate.car_id} />
        </div>
      </CardContent>
    </Card>
  );
}
