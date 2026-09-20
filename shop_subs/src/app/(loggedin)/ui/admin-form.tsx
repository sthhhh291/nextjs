"use client";
import { saveAdmin, deleteAdmin } from "@/actions/admin";
import { useActionState } from "react";
import type { Admin } from "@/types";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { FieldSet, Field } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

import { Card } from "@/components/ui/card";
import { Trash } from "lucide-react";
export default function AdminForm(params: { admin: Admin | null }) {
  const data = params.admin;
  const [state, formAction, isPending] = useActionState(saveAdmin, {
    error: null,
    success: false,
    admin: null,
  });
  const [tax_rate, setTaxRate] = useState(data?.tax_rate || "");
  const [labor_rate, setLaborRate] = useState(data?.labor_rate || "");
  const [shop_fees_percent, setShopFeesPercent] = useState(data?.shop_fees_percent || "");
  const [shop_fees_limit, setShopFeesLimit] = useState(data?.shop_fees_limit || "");

  const buttonAction = data ? "Save Changes" : "Create Admin";

  async function handleDelete(id: number) {
    const conf = confirm("Are you sure you want to delete admin?");
    if (conf) {
      await deleteAdmin(id);
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
            <Label htmlFor='tax_rate'>Tax Rate</Label>
            <Input
              type='number'
              name="tax_rate"
              placeholder="Tax Rate..."
              value={tax_rate}
              onChange={(e) => setTaxRate(e.target.value)}
            />
          </Field>
          <Field>
            <Label htmlFor='labor_rate'>labor_rate</Label>
            <Input
              type='text'
              name='labor_rate'
              placeholder='Labor Rate...'
              value={labor_rate}
              onChange={(e) => setLaborRate(e.target.value)}
            />
          </Field>
          <Field>
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
          </Field>
          <Field>
            <Label aria-hidden='true' className='invisible'>
              Action
            </Label>
            <Button className='w-full' type='submit' disabled={isPending}>
              {isPending ? "Saving..." : buttonAction}
            </Button>
          </Field>
          {/* {data && (
            <Field>
              <Label className='invisible'>Delete</Label>
              <Button onClick={() => handleDelete(data.id)}>
                <Trash />
              </Button>
            </Field>
          )} */}
        </FieldSet>
      </form>
    </Card>
  );
}
