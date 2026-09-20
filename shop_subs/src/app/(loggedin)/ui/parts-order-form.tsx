"use client";
import { savePartsOrder, deletePartsOrder } from "@/actions/parts-order";
import { useActionState } from "react";
import type { PartsOrder } from "@/types";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { FieldSet, Field } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

import { Card } from "@/components/ui/card";
import { Trash } from "lucide-react";
export default function PartsOrderForm(params: { order: PartsOrder | null }) {
  const data = params.order;
  const [state, formAction, isPending] = useActionState(savePartsOrder, {
    error: null,
    success: false,
    order: null,
  });
  const [mfr_no, setMfr_no] = useState(data?.mfr_no || "");
  const [part_no, setPartNo] = useState(data?.part_no || "");
  const [description, setDescription] = useState(data?.description || "");
  const [price, setPrice] = useState(data?.price || "");

  const buttonAction = data ? "Save Changes" : "Create PartsOrder";

  async function handleDelete(id: number) {
    const conf = confirm("Are you sure you want to delete order?");
    if (conf) {
      await deletePartsOrder(id);
    }
  }

  return (
    <Card>
      <form
        action={formAction}
        className='grid grid-cols-1 gap-6 sm:grid-cols-4 px-4 mx-4'>
        {data && <input type='hidden' name='id' value={data.id} />}
        <FieldSet className='col-span-full grid grid-cols-1 gap-6 sm:grid-cols-5'>
          <Field>
            <Label htmlFor='description'>description</Label>
            <Input
              type='number'
              name="description"
              placeholder="description..."
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </Field>
          <Field>
            <Label htmlFor='mfr_no'>PartsOrder Factor</Label>
            <Input
              type='text'
              name='mfr_no'
              placeholder='Labor Rate...'
              value={mfr_no}
              onChange={(e) => setMfr_no(e.target.value)}
            />
          </Field>
          <Field>
            <Label htmlFor='part_no'>part_no</Label>
            <Input
              type='text'
              name='part_no'
              placeholder='model...'
              value={part_no}
              onChange={(e) => setPartNo(e.target.value)}
            />
          </Field>
          <Field>
            <Label htmlFor='price'>price</Label>
            <Input
              type='text'
              name='price'
              placeholder='Shop fees upper limit...'
              value={price}
              onChange={(e) => setPrice(e.target.value)}
            />
          </Field>
          <Field>
            <Label aria-hidden='true' className='invisible'>
              Action
            </Label>
            <Button className='w-full' type='submit' disabled={isPending}>
              {isPending ? "Saving..." : buttonAction}
            </Button>
          </Field>
          {data && (
            <Field>
              <Label className='invisible'>Delete</Label>
              <Button onClick={() => handleDelete(data.id)}>
                <Trash />
              </Button>
            </Field>
          )}
        </FieldSet>
      </form>
    </Card>
  );
}
