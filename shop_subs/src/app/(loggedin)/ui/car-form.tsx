"use client";
import { saveCar } from "@/actions/car";
import { startTransition, useActionState } from "react";
import type { Car } from "@/types";
import { useState, useEffect } from "react";
import {
  Dialog,
  DialogContent,
  DialogTrigger,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import {
  FieldGroup,
  FieldSet,
  FieldLegend,
  Field,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { SquarePen } from "lucide-react";
export default function CarForm(params: {
  car: Car | null;
  customer_id: number;
}) {
  const data = params.car;
  const customer_id = params.customer_id;
  const [state, formAction, isPending] = useActionState(saveCar, {
    error: null,
    success: false,
    car: null,
  });
  const [open, setOpen] = useState(false);
  const buttonAction = data ? "Update Car" : "Create Car";

  useEffect(() => {
    if (!isPending && state.success) {
      startTransition(() => setOpen(false));
    }
  }, [isPending, state.success]);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger
        render={
          <Button
            variant={data ? "ghost" : "default"}
            size={data ? "icon-sm" : "default"}
            aria-label={data ? "Edit vehicle" : undefined}
            title={data ? "Edit vehicle" : "Create vehicle"}>
            {data ?
              <SquarePen aria-hidden='true' />
            : "Create Car"}
          </Button>
        }
      />
      <DialogContent className='sm:max-w-2xl'>
        <DialogHeader>
          <DialogTitle>{data ? "Edit vehicle" : "New vehicle"}</DialogTitle>
        </DialogHeader>
        <form
          action={formAction}
          className='grid grid-cols-1 gap-6 sm:grid-cols-2'>
          {data && <input type='hidden' name='id' value={data.id} />}
          <input type='hidden' name='customer_id' value={customer_id} />
          <FieldGroup>
            <FieldSet>
              <FieldLegend>Car Details</FieldLegend>
              <Field>
                <Label htmlFor='year'>Year</Label>
                <Input
                  type='number'
                  name='year'
                  min='1900'
                  max={new Date().getFullYear() + 1}
                  step='1'
                  placeholder='year...'
                  defaultValue={data?.year?.toString() ?? (new Date().getFullYear() - 5).toString()}
                />
              </Field>
              <Field>
                <Label htmlFor='make'>Make</Label>
                <Input
                  type='text'
                  name='make'
                  placeholder='make...'
                  defaultValue={data?.make || ""}
                />
              </Field>
              <Field>
                <Label htmlFor='car_model'>Model</Label>
                <Input
                  type='text'
                  name='car_model'
                  placeholder='model...'
                  defaultValue={data?.car_model || ""}
                />
              </Field>
              <Field>
                <Label htmlFor='engine'>Engine</Label>
                <Input
                  type='text'
                  name='engine'
                  placeholder='engine...'
                  defaultValue={data?.engine || ""}
                />
              </Field>
            </FieldSet>
          </FieldGroup>
          <FieldGroup>
            <Field>
              <Label htmlFor='vin'>VIN</Label>
              <Input
                type='text'
                name='vin'
                placeholder='VIN...'
                defaultValue={data?.vin || ""}
              />
            </Field>
            <Field>
              <Label htmlFor='color'>Color</Label>
              <Input
                type='text'
                name='color'
                placeholder='color...'
                defaultValue={data?.color || ""}
              />
            </Field>
            <Field>
              <Label htmlFor='license'>License Plate</Label>
              <Input
                type='text'
                name='license'
                placeholder='license...'
                defaultValue={data?.license || ""}
              />
            </Field>
            <Field>
              <Label htmlFor='fleet_number'>Fleet Number</Label>
              <Input
                type='text'
                name='fleet_number'
                placeholder='fleet number...'
                defaultValue={data?.fleet_number || ""}
              />
            </Field>
            <Field>
              <Label htmlFor='notes'>Notes</Label>
              <Textarea
                name='notes'
                placeholder='notes...'
                defaultValue={data?.notes || ""}
              />
            </Field>
            {/* </FieldSet> */}
          </FieldGroup>
          <Button className='sm:col-span-2' type='submit' disabled={isPending}>
            {isPending ? "Saving..." : buttonAction}
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}
