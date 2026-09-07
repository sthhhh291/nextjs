"use client";
import { saveCar } from "@/app/actions";
import { useActionState } from "react";
import type { Car } from "@/types";
import { useState, useEffect } from "react";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
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

export default function CarForm(params: {
  car: Car | null;
  customer_id: number;
}) {
  const data = params.car;
  const id = params.car?.id || null;
  const customer_id = params.customer_id;
  const [state, formAction, isPending] = useActionState(saveCar, {
    error: null,
    success: false,
    car: null,
  });
  const [year, setYear] = useState(
    data?.year?.toString() ?? (new Date().getFullYear() - 5).toString(),
  );
  const [make, setMake] = useState(data?.make || "");
  const [car_model, setCarModel] = useState(data?.car_model || "");
  const [engine, setEngine] = useState(data?.engine || "");
  const [vin, setVin] = useState(data?.vin || "");
  const [license, setLicense] = useState(data?.license || "");
  const [color, setColor] = useState(data?.color || "");
  const [fleet_number, setFleetNumber] = useState(data?.fleet_number || "");
  const [notes, setNotes] = useState(data?.notes || "");
  const [open, setOpen] = useState(false);
  const buttonAction = data ? "Update Car" : "Create Car";

  useEffect(() => {
    if (!isPending && state.success) {
      setOpen(false);
    }
  }, [isPending, state.success]);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger>
        <Button>{data ? "Edit Car" : "Create Car"}</Button>
      </DialogTrigger>
      <DialogContent className='sm:max-w-2xl'>
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
                  value={year}
                  onChange={(e) => setYear(e.target.value)}
                />
              </Field>
              <Field>
                <Label htmlFor='make'>Make</Label>
                <Input
                  type='text'
                  name='make'
                  placeholder='make...'
                  value={make}
                  onChange={(e) => setMake(e.target.value)}
                />
              </Field>
              <Field>
                <Label htmlFor='car_model'>Model</Label>
                <Input
                  type='text'
                  name='car_model'
                  placeholder='model...'
                  value={car_model}
                  onChange={(e) => setCarModel(e.target.value)}
                />
              </Field>
              <Field>
                <Label htmlFor='engine'>Engine</Label>
                <Input
                  type='text'
                  name='engine'
                  placeholder='engine...'
                  value={engine}
                  onChange={(e) => setEngine(e.target.value)}
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
                value={vin}
                onChange={(e) => setVin(e.target.value)}
              />
            </Field>
            <Field>
              <Label htmlFor='color'>Color</Label>
              <Input
                type='text'
                name='color'
                placeholder='color...'
                value={color}
                onChange={(e) => setColor(e.target.value)}
              />
            </Field>
            <Field>
              <Label htmlFor='license'>License Plate</Label>
              <Input
                type='text'
                name='license'
                placeholder='license...'
                value={license}
                onChange={(e) => setLicense(e.target.value)}
              />
            </Field>
            <Field>
              <Label htmlFor='fleet_number'>Fleet Number</Label>
              <Input
                type='text'
                name='fleet_number'
                placeholder='fleet number...'
                value={fleet_number}
                onChange={(e) => setFleetNumber(e.target.value)}
              />
            </Field>
            <Field>
              <Label htmlFor='notes'>Notes</Label>
              <Textarea
                name='notes'
                placeholder='notes...'
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
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
