"use client";
import { saveCustomer } from "@/actions/customer";
import { startTransition, useActionState } from "react";
import type { Customer } from "@/types";
import { useEffect, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { FieldGroup, FieldSet, Field } from "@/components/ui/field";
import { Button } from "@/components/ui/button";
import { SquarePen } from "lucide-react";

export default function CustomerForm(params: { customer: Customer | null }) {
  const data = params.customer;
  const [open, setOpen] = useState(false);
  const [state, formAction, isPending] = useActionState(saveCustomer, {
    error: null,
    success: false,
    customer: null,
  });
  const [firstName, setFirstName] = useState(data?.first_name || "");
  const [lastName, setLastName] = useState(data?.last_name || "");
  const [notes, setNotes] = useState(data?.notes || "");
  const buttonAction = data ? "Update Customer" : "Create Customer";

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
            aria-label={data ? "Edit customer" : undefined}
            title={data ? "Edit customer" : "Create customer"}>
            {data ?
              <SquarePen aria-hidden='true' />
            : "Create Customer"}
          </Button>
        }
      />
      <DialogContent>
        <form action={formAction}>
          {data && <input type='hidden' name='id' value={data.id} />}
          <DialogHeader>
            <DialogTitle>{data ? "Edit customer" : "New customer"}</DialogTitle>
            <FieldGroup>
              <FieldSet>
                <Field orientation='responsive'>
                  <Label htmlFor='first_name'>First Name</Label>
                  <Input
                    id='first_name'
                    name='first_name'
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                  />
                </Field>
                <Field orientation='responsive'>
                  <Label htmlFor='last_name'>Last Name</Label>
                  <Input
                    id='last_name'
                    name='last_name'
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                  />
                </Field>
                <Field orientation='responsive'>
                  <Label htmlFor='notes'>Notes</Label>
                  <Textarea
                    id='notes'
                    name='notes'
                    value={notes}
                    onChange={(e) => setNotes(e.target.value)}
                  />
                </Field>
              </FieldSet>
            </FieldGroup>
          </DialogHeader>
          <Button type='submit' disabled={isPending}>
            {isPending ? "Saving..." : buttonAction}
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}
