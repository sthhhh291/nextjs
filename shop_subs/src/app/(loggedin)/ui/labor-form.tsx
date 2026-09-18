"use client";
import { saveLabor } from "@/actions/labor";
import { useActionState } from "react";
import type { Labor } from "@/types";
import { useState, useEffect } from "react";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { FieldGroup, Field } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { SquarePen } from "lucide-react"

export default function SubForm(params: {
  labor: Labor | null;
  sub_id: number;
}) {
  const data = params.labor;
  const sub_id = params.sub_id;
  const [open, setOpen] = useState(false);
  const buttonAction = data ? "Create" : "Save Changes";
  const [state, formAction, isPending] = useActionState(saveLabor, {
    error: null,
    success: false,
    labor: null,
  });
  const [description, setDescription] = useState(data?.description || "");
  const [hours, setHours] = useState(data?.hours || 0);
  const [rate, setRate] = useState(data?.rate || 0);
  const [price, setPrice] = useState(data?.price || 0);

  useEffect(() => {
    if (!isPending && state.success) {
      setOpen(false);
    }
  }, [isPending, state.success]);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger>
        <Button>{data ? <SquarePen /> : "Create Labor"}</Button>
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
              <Label htmlFor='rate'>rate</Label>
              <Input
                type='number'
                step={0.01}
                name='rate'
                placeholder='Rate...'
                value={rate}
                onChange={(e) => setRate(Number(e.target.value))}
              />
            </Field>
            <Field>
              <Label htmlFor='hours'>hours</Label>
              <Input
                type='text'
                step={0.01}
                name='hours'
                placeholder='Hours...'
                value={hours}
                onChange={(e) => setHours(Number(e.target.value))}
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
