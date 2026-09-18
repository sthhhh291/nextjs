"use client";
import { saveOil } from "@/actions/oil";
import { startTransition, useActionState } from "react";
import type { Part } from "@/types";
import { useState, useEffect } from "react";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { FieldGroup, Field } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {SquarePen} from "lucide-react"

export default function SubForm(params: {
  oil: Part | null;
  sub_id: number;
}) {
  const data = params.oil;
  const sub_id = params.sub_id;
  const [open, setOpen] = useState(false);
  const buttonAction = data ? "Create" : "Save Changes";
  const [state, formAction, isPending] = useActionState(saveOil, {
    error: null,
    success: false,
    oil: null,
  });
  const [description, setDescription] = useState(data?.description || "");
  const [manufacturer, setManufacturer] = useState(data?.manufacturer || "");
  const [part_number, setpartNumber] = useState(data?.part_number || "");
  const [quantity,setQuantity] = useState(data?.quantity || 0);
  const [cost,setCost] = useState(data?.cost || 0);
  const [list,setList] = useState(data?.list || 0);
  const [price, setPrice] = useState(data?.price || 0);

  useEffect(() => {
    if (!isPending && state.success) {
      startTransition(() => setOpen(false));
    }
  }, [isPending, state.success]);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger>
        <Button>{data ? <SquarePen /> : "Create Oil"}</Button>
      </DialogTrigger>
      <DialogContent className='sm:max-w-2xl'>
        <form
          action={formAction}
          className='grid grid-cols-1 gap-6 sm:grid-cols-2'>
          {data && <input type='hidden' name='id' value={data.id} />}
          <input type='hidden' name='sub_estimate_id' value={sub_id} />
          <FieldGroup>
            <Field>
              <Label htmlFor='description'>description</Label>
              <Input
                type='text'
                name='description'
                placeholder='Description...'
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
            </Field>
            <Field>
              <Label htmlFor='manufacturer'>manufacturer</Label>
              <Input
                type='text'
                name='manufacturer'
                placeholder='Manufacturer Number...'
                value={manufacturer}
                onChange={(e) => setManufacturer(e.target.value)}
              />
            </Field>
            <Field>
              <Label htmlFor='part_number'>part_number</Label>
              <Input
                type='text'
                name='part_number'
                placeholder='Part Number...'
                value={part_number}
                onChange={(e) => setpartNumber(e.target.value)}
              />
            </Field>
            <Field>
              <Label htmlFor='quantity'>Quantity</Label>
              <Input
                type='number'
                step={0.01}
                name='quantity'
                placeholder='Quantity...'
                value={quantity}
                onChange={(e) => setQuantity(Number(e.target.value))}
              />
            </Field>
            <Field>
              <Label htmlFor='cost'>Oil Cost</Label>
              <Input
                type='text'
                step={0.01}
                name='cost'
                placeholder='Oil Cost...'
                value={cost}
                onChange={(e) => setCost(Number(e.target.value))}
              />
            </Field>
            <Field>
              <Label htmlFor='list'>List Price</Label>
              <Input
                type='text'
                name='list'
                step={0.01}
                placeholder='Price...'
                value={list}
                onChange={(e) => setList(Number(e.target.value))}
              />
            </Field>
            <Field>
              <Label htmlFor='price'>price</Label>
              <Input
                type='text'
                name='price'
                step={0.01}
                placeholder='Price...'
                value={price}
                onChange={(e) => setPrice(Number(e.target.value))}
              />
            </Field>
          </FieldGroup>
          {state.error && (
            <p className='text-sm text-destructive sm:col-span-2'>
              {state.error}
            </p>
          )}
          <Button className='sm:col-span-2' type='submit' disabled={isPending}>
            {isPending ? "Saving..." : buttonAction}
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}
