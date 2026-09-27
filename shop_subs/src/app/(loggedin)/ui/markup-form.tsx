"use client";
import { saveMarkup, deleteMarkup } from "@/actions/markup";
import { useActionState } from "react";
import type { Markup } from "@/types";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { FieldSet, Field } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

import { Card } from "@/components/ui/card";
import { Trash } from "lucide-react";
export default function MarkupForm(params: { markup: Markup | null }) {
  const data = params.markup;
  const [state, formAction, isPending] = useActionState(saveMarkup, {
    error: null,
    success: false,
    markup: null,
  });
  const [amount, setAmount] = useState(data?.amount || "");
  const [markup_factor, setMarkupFactor] = useState(data?.markup_factor || "");

  const buttonAction = data ? "Save Changes" : "Create Markup";

  async function handleDelete(id: number) {
    const conf = confirm("Are you sure you want to delete markup?");
    if (conf) {
      await deleteMarkup(id);
    }
  }

  return (
    <Card>
      <form action={formAction} className='p-4 sm:p-5'>
        {data && <input type='hidden' name='id' value={data.id} />}
        {state.error && (
          <p role='alert' className='mb-4 text-sm text-destructive'>
            {state.error}
          </p>
        )}
        <FieldSet className='grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4'>
          <Field>
            <Label htmlFor='amount'>Amount</Label>
            <Input
              type='number'
              name='amount'
              placeholder='Amount...'
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
            />
          </Field>
          <Field>
            <Label htmlFor='markup_factor'>Markup Factor</Label>
            <Input
              type='text'
              name='markup_factor'
              placeholder='Labor Rate...'
              value={markup_factor}
              onChange={(e) => setMarkupFactor(e.target.value)}
            />
          </Field>
          {/* <Field>
            <Label htmlFor='shop_fees_percent'>shop_fees_percent</Label>
            <Input
              type='text'
              name='shop_fees_percent'
              placeholder='model...'
              value={shop_fees_percent}
              onChange={(e) => setShopFeesPercent(e.target.value)}
            />
          </Field>
          <Field>
            <Label htmlFor='shop_fees_limit'>shop_fees_limit</Label>
            <Input
              type='text'
              name='shop_fees_limit'
              placeholder='Shop fees upper limit...'
              value={shop_fees_limit}
              onChange={(e) => setShopFeesLimit(e.target.value)}
            />
          </Field> */}
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
              <Button
                type='button'
                variant='destructive'
                size='icon'
                aria-label='Delete markup rule'
                title='Delete markup rule'
                onClick={() => handleDelete(data.id)}>
                <Trash />
              </Button>
            </Field>
          )}
        </FieldSet>
      </form>
    </Card>
  );
}
