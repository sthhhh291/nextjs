"use client";
import { saveAddress } from "@/actions/address";
import { useActionState } from "react";
import type { Address } from "@/types";
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

export default function AddressForm(params: {
  address: Address | null;
  customer_id: number;
}) {
  const data = params.address;
  const id = params.address?.id;
  const customer_id = params.customer_id;
  const [state, formAction, isPending] = useActionState(saveAddress, {
    error: null,
    success: false,
    address: null,
  });
  const [street, setStreet] = useState(data?.street || "");
  const [city, setCity] = useState(data?.city || "");
  const [stateAd, setStateAd] = useState(data?.state || "");
  const [zip_code, setZipCode] = useState(data?.zip_code || "");
  const [open, setOpen] = useState(false);
  useEffect(() => {
    if (!isPending && state.success) {
      setOpen(false);
    }
  }, [isPending, state.success]);
  const buttonAction = data ? "Update Address" : "Create Address";
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger
        render={
          <Button>{data ? <SquarePen /> : "Create Address"}</Button>
        }></DialogTrigger>
      <DialogContent>
        <form action={formAction}>
          {data && <input type='hidden' name='id' value={id} />}
          <input type='hidden' name='customer_id' value={customer_id} />
          <FieldGroup>
            <FieldSet>
              <Field orientation='horizontal'>
                <Label htmlFor='street'>street</Label>
                <Input
                  id='street'
                  name='street'
                  placeholder='street...'
                  value={street}
                  onChange={(e) => setStreet(e.target.value)}
                />
              </Field>
              <FieldLegend>City</FieldLegend>
              <Field orientation='horizontal'>
               <Label htmlFor="city">City</Label> 
               <Input
                id="city"
                name="city"
                placeholder="City..."
                value={city}
                onChange={(e) => setCity(e.target.value)}
                />
              </Field>
              <Field orientation='horizontal'>
                <Label htmlFor='state'>state</Label>
                <Input
                  id='state'
                  name='state'
                  placeholder='state...'
                  value={stateAd}
                  onChange={(e) => setStateAd(e.target.value)}
                />
              </Field>
              <Field orientation='horizontal'>
                <Label htmlFor='zip_code'>zip_code</Label>
                <Input
                  id='zip_code'
                  name='zip_code'
                  placeholder='zip_code...'
                  value={zip_code}
                  onChange={(e) => setZipCode(e.target.value)}
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
