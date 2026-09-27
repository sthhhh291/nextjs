"use client";
import CarForm from "./car-form";
import { Car } from "@/types";
import { deleteCar } from "@/actions/car";
import { Button } from "@/components/ui/button";
import { Trash } from "lucide-react";
import { Copy } from "lucide-react";

export default function CarLine(params: { car: Car }) {
  const car = params.car;
  const customer_id = car.customer_id as number;
  const deleteCarHandler = async (id: number) => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this car number?",
    );
    if (confirmed) {
      try {
        await deleteCar(id, customer_id);
      } catch (error) {
        console.error("Error deleting car:", error);
      }
    }
  };

  async function handleCopyVin() {
    if (!car.vin) return;

    try {
      await navigator.clipboard.writeText(car.vin);
      alert("Copied to clipboard: " + car.vin);
    } catch (error) {
      console.error("Unable to copy VIN:", error);
    }
  }

  return (
    <div className='space-y-4'>
      <div className='flex flex-wrap items-start justify-between gap-3'>
        <p className='text-base font-medium text-foreground'>
          {car.year} {car.make} {car.car_model}
        </p>
        <div className='flex items-center gap-1'>
          <CarForm car={car} customer_id={customer_id} />
          <Button
            type='button'
            variant='ghost'
            size='icon'
            aria-label='Delete vehicle'
            title='Delete vehicle'
            className='text-destructive hover:bg-destructive/10 hover:text-destructive'
            onClick={() => deleteCarHandler(car.id)}>
            <Trash aria-hidden='true' />
          </Button>
        </div>
      </div>
      <dl className='grid gap-x-6 gap-y-3 border-t pt-4 text-sm sm:grid-cols-2'>
        <div>
          <dt className='text-xs text-muted-foreground'>Engine</dt>
          <dd className='mt-1 text-foreground'>{car.engine || "—"}</dd>
        </div>
        <div>
          <dt className='text-xs text-muted-foreground'>VIN</dt>
          <dd className='mt-1 flex min-w-0 items-center gap-1.5 text-sm text-foreground'>
            <span className='min-w-0 break-all'>{car.vin || "—"}</span>
            {car.vin && (
              <Button
                type='button'
                variant='ghost'
                size='icon-sm'
                aria-label='Copy VIN'
                title='Copy VIN'
                className='shrink-0'
                onClick={handleCopyVin}>
                <Copy aria-hidden='true' />
              </Button>
            )}
          </dd>
        </div>
        <div>
          <dt className='text-xs text-muted-foreground'>License plate</dt>
          <dd className='mt-1 text-foreground'>{car.license || "—"}</dd>
        </div>
        <div>
          <dt className='text-xs text-muted-foreground'>Color</dt>
          <dd className='mt-1 text-foreground'>{car.color || "—"}</dd>
        </div>
        <div>
          <dt className='text-xs text-muted-foreground'>Fleet number</dt>
          <dd className='mt-1 text-foreground'>{car.fleet_number || "—"}</dd>
        </div>
        {car.notes && (
          <div className='sm:col-span-2'>
            <dt className='text-xs text-muted-foreground'>Notes</dt>
            <dd className='mt-1 whitespace-pre-wrap text-foreground'>
              {car.notes}
            </dd>
          </div>
        )}
      </dl>
    </div>
  );
}
