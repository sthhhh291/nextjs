"use client";
import { saveEmail } from "@/actions/email";
import { useActionState } from "react";
import type { Email } from "@/types";
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
import { SquarePen } from "lucide-react";

export default function EmailForm(params: {
  email: Email | null;
  customer_id: number;
}) {
  const data = params.email;
  const id = params.email?.id;
  const customer_id = params.customer_id;
  const [state, formAction, isPending] = useActionState(saveEmail, {
    error: null,
    success: false,
    email: null,
  });
  const [type, setType] = useState(data?.type || "");
  const [address, setAddress] = useState(data?.address || "");
  const [open, setOpen] = useState(false);
  useEffect(() => {
    if (!isPending && state.success) {
      setOpen(false);
    }
  }, [isPending, state.success]);
  const buttonAction = data ? "Update Email" : "Create Email";
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger
        render={
          <Button>{data ? <SquarePen /> : "Create Email"}</Button>
        }></DialogTrigger>
      <DialogContent>
        <form action={formAction}>
          {data && <input type='hidden' name='id' value={id} />}
          <input type='hidden' name='customer_id' value={customer_id} />
          <FieldGroup>
            <FieldSet>
              <FieldLegend>Email Type</FieldLegend>
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
                <Label htmlFor='address'>address</Label>
                <Input
                  id='address'
                  name='address'
                  placeholder='address...'
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
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
