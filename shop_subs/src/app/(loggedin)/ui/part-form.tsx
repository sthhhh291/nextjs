"use client";
import { savePart } from "@/actions/parts";
import { getMarkup } from "@/actions/markup";
import { startTransition, useActionState } from "react";
import type { Markup, Part } from "@/types";
import { useState, useEffect } from "react";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { FieldGroup, Field } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { SquarePen } from "lucide-react";

export default function SubForm(params: { part: Part | null; sub_id: number }) {
  const data = params.part;
  const sub_id = params.sub_id;
  const [open, setOpen] = useState(false);
  const buttonAction = data ? "Create" : "Save Changes";
  const [state, formAction, isPending] = useActionState(savePart, {
    error: null,
    success: false,
    parts: null,
  });
  const [description, setDescription] = useState(data?.description || "");
  const [manufacturer, setManufacturer] = useState(data?.manufacturer || "");
  const [part_number, setPartNumber] = useState(data?.part_number || "");
  const [quantity, setQuantity] = useState(data?.quantity || 0);
  const [cost, setCost] = useState(data?.cost || 0);
  const [list, setList] = useState(data?.list || 0);
  const [price, setPrice] = useState(data?.price || 0);
  const [markups, setMarkups] = useState<Markup[]>([]);
  const [markup, setMarkup] = useState(1.86);

  // open/close dialog
  useEffect(() => {
    if (!isPending && state.success) {
      startTransition(() => setOpen(false));
    }
  }, [isPending, state.success]);

  // load markup tables
  useEffect(() => {
    let active = true;

    const loadMarkup = async () => {
      try {
        const data = await getMarkup();
        if (active) {
          setMarkups(data);
        }
      } catch (error) {
        console.error("Failed to load admin:", error);
      }
    };

    loadMarkup();

    return () => {
      active = false;
    };
  }, []);

  // calculate price when cost changes
  useEffect(() => {
    function calculateMarkup(num: number): number {
      const sortedMarkups = [...markups]
        .filter((markup) => Number.isFinite(Number(markup.amount)) && Number.isFinite(Number(markup.markup_factor)))
        .sort((a, b) => Number(a.amount) - Number(b.amount));

      if (sortedMarkups.length === 0) {
        return 1;
      }

      const first = sortedMarkups[0];
      const last = sortedMarkups[sortedMarkups.length - 1];

      if (num <= Number(first.amount)) {
        return Number(first.markup_factor);
      }

      if (num >= Number(last.amount)) {
        return Number(last.markup_factor);
      }

      for (let index = 1; index < sortedMarkups.length; index++) {
        const lower = sortedMarkups[index - 1];
        const upper = sortedMarkups[index];

        const lowAmount = Number(lower.amount);
        const highAmount = Number(upper.amount);
        if (num <= highAmount) {
          const position = (num - lowAmount) / (highAmount - lowAmount);
          const lowFactor = Number(lower.markup_factor);
          const highFactor = Number(upper.markup_factor);
          return lowFactor + position * (highFactor - lowFactor);
        }
      }

      return Number(last.markup_factor);
    }

    const factor = Math.round(calculateMarkup(cost)*100)/100;
    startTransition(() => {
      // setPrice(cost * factor)
      setMarkup(factor);
  });
  }, [cost, markups]);

  useEffect(() => {
    startTransition(() => setPrice(Math.round(markup * cost*100)/100));
  },[markup, cost])

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger>
        <Button>
          {data ?
            <SquarePen />
          : "Create Part"}
        </Button>
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
                onChange={(e) => setPartNumber(e.target.value)}
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
              <Label htmlFor='markup'>Part Markup</Label>
              <Input
                type='number'
                step={0.01}
                name='markup'
                placeholder='Part Cost...'
                value={markup}
                onChange={(e) => setMarkup(Number(e.target.value))}
              />
            </Field>
            <Field>
              <Label htmlFor='cost'>Part Cost</Label>
              <Input
                type='number'
                step={0.01}
                name='cost'
                placeholder='Part Cost...'
                value={cost}
                onChange={(e) => setCost(Number(e.target.value))}
              />
            </Field>
            <Field>
              <Label htmlFor='list'>List Price</Label>
              <Input
                type='number'
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
                type='number'
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
