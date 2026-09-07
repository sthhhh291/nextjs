"use client";
import { savePhone } from "@/app/actions";
import { useActionState } from "react";
import type { Phone } from "@/types";
import { useState, useEffect } from "react";
import { Dialog, DialogTrigger, DialogContent } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  FieldGroup,
  FieldSet,
  FieldLegend,
  Field,
} from "@/components/ui/field";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";

export default function PhoneForm(params: {
  phone: Phone | null;
  customer_id: number;
}) {
  const data = params.phone;
  const id = params.phone?.id;
  const customer_id = params.customer_id;
  const [state, formAction, isPending] = useActionState(savePhone, {
    error: null,
    success: false,
    phone: null,
  });
  const [type, setType] = useState(data?.type || "");
  const [number, setNumber] = useState(data?.number || "");
  const [open, setOpen] = useState(false);
  useEffect(() => {
    if (!isPending && state.success) {
      setOpen(false);
    }
  }, [isPending, state.success]);
  const buttonAction = data ? "Update Phone" : "Create Phone";
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger
        render={
          <Button>{data ? "Edit Phone" : "Create Phone"}</Button>
        }></DialogTrigger>
      <DialogContent>
        <form action={formAction}>
          {data && <input type='hidden' name='id' value={id} />}
          <input type='hidden' name='customer_id' value={customer_id} />
          <FieldGroup>
            <FieldSet>
              <FieldLegend>Phone Type</FieldLegend>
              <Field orientation='horizontal'>
                <Select name='type' value={type} onValueChange={setType}>
                  <SelectTrigger className='border border-gray-300 rounded p-2 m-2'>
                    <SelectValue placeholder='Select Type' />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value='home'>Home</SelectItem>
                    <SelectItem value='work'>Work</SelectItem>
                    <SelectItem value='mobile'>Mobile</SelectItem>
                  </SelectContent>
                </Select>
              </Field>
              <Field orientation='horizontal'>
                <Label htmlFor='number'>Number</Label>
                <Input
                  id='number'
                  name='number'
                  placeholder='number...'
                  value={number}
                  onChange={(e) => setNumber(e.target.value)}
                />
              </Field>
              <Button type='submit' disabled={isPending}>
                {isPending ? "Saving..." : buttonAction}
              </Button>
            </FieldSet>
          </FieldGroup>
        </form>
      </DialogContent>
    </Dialog>
  );
}
