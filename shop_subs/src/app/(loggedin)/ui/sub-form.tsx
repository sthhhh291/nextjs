"use client";
import { saveSubEstimate } from "@/actions/sub-estimate";
import { useActionState } from "react";
import type { Sub_estimate } from "@/types";
import { useState, useEffect } from "react";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { FieldGroup, FieldSet, Field } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function SubForm(params: {
  sub: Sub_estimate | null;
  estimate_id: number;
}) {
  const data = params.sub;
  const estimate_id = params.estimate_id;
  const [open, setOpen] = useState(false);
  const buttonAction = estimate_id ? "Create" : "Save Changes";
  const [state, formAction, isPending] = useActionState(saveSubEstimate, {
    error: null,
    success: false,
    sub: null,
  });
  const [description, setDescription] = useState(data?.description || "");

  useEffect(() => {
    if (!isPending && state.success) {
      setOpen(false);
    }
  }, [isPending, state.success]);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger>
        <Button>{data ? "Edit Sub" : "Create Sub"}</Button>
      </DialogTrigger>
      <DialogContent className='sm:max-w-2xl'>
        <form
          action={formAction}
          className='grid grid-cols-1 gap-6 sm:grid-cols-2'>
          {data && <input type='hidden' name='id' value={data.id} />}
          <input type='hidden' name='estimate_id' value={estimate_id} />
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
