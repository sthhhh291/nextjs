"use client";
import { savePhone } from "@/actions/phone";
import { startTransition, useActionState } from "react";
import type { Phone } from "@/types";
import { useState, useEffect } from "react";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
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
import { SquarePen } from "lucide-react";

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
      startTransition(() => setOpen(false));
    }
  }, [isPending, state.success]);
  const buttonAction = data ? "Update Phone" : "Create Phone";
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger
        render={
          <Button
            variant={data ? "ghost" : "default"}
            size={data ? "icon-sm" : "default"}
            aria-label={data ? "Edit phone number" : undefined}
            title={data ? "Edit phone number" : "Create phone number"}>
            {data ?
              <SquarePen aria-hidden='true' />
            : "Create Phone"}
          </Button>
        }
      />
      <DialogContent>
        <form action={formAction}>
          <DialogHeader className='mb-5'>
            <DialogTitle>
              {data ? "Edit phone number" : "New phone number"}
            </DialogTitle>
          </DialogHeader>
          {data && <input type='hidden' name='id' value={id} />}
          <input type='hidden' name='customer_id' value={customer_id} />
          <FieldGroup>
            <FieldSet>
              <FieldLegend>Phone Type</FieldLegend>
              <Field orientation='responsive'>
                <Select
                  name='type'
                  value={type}
                  onValueChange={(value) => setType(value ?? "")}>
                  <SelectTrigger className='w-full'>
                    <SelectValue placeholder='Select Type' />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value='home'>Home</SelectItem>
                    <SelectItem value='work'>Work</SelectItem>
                    <SelectItem value='mobile'>Mobile</SelectItem>
                  </SelectContent>
                </Select>
              </Field>
              <Field orientation='responsive'>
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
