"use client";
import { savePhone } from "@/app/actions";
import { useActionState } from "react";
import type { Phone } from "@/types";
import { useState, useEffect } from "react";
import {
  Dialog,
  DialogTrigger,
  DialogHeader,
  DialogContent,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  FieldGroup,
  FieldSet,
  FieldLegend,
  Field,
} from "@/components/ui/field";
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
      <DialogHeader>{data ? "Edit" : "Create"} Phone Form</DialogHeader>
      <DialogContent>
        <form action={formAction}>
          {data && <input type='hidden' name='id' value={id} />}
          <input type='hidden' name='customer_id' value={customer_id} />
          <FieldGroup>
            <FieldSet>
              <FieldLegend>Phone Type</FieldLegend>
              <Field orientation='horizontal'>
                <select
                  name='type'
                  value={type}
                  onChange={(e) => setType(e.target.value)}
                  className='border border-gray-300 rounded p-2 m-2'>
                  <option value=''>Select Type</option>
                  <option value='home'>Home</option>
                  <option value='work'>Work</option>
                  <option value='mobile'>Mobile</option>
                </select>
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

//       name='type'
//       value={type}
//       onChange={(e) => setType(e.target.value)}
//       className='border border-gray-300 rounded p-2 m-2'>
//       <option value=''>Select Type</option>
//       <option value='home'>Home</option>
//       <option value='work'>Work</option>
//       <option value='mobile'>Mobile</option>
//     </select>
//   </div>
//   <div className='text-lg font-bold p-2 m-2'>
//     {/* {data ? "Edit Phone" : "New Phone"} */}
//     <label
//       htmlFor='number'
//       className='block text-sm font-medium text-gray-700'>
//       Number
//     </label>
//     <input
//       type='text'
//       name='number'
//       placeholder='number...'
//       value={number}
//       onChange={(e) => setNumber(e.target.value)}
//     />
//   </div>
//   <div className='text-lg font-bold p-2 m-2'>
//     <button
//       className='p-3 border rounded-sm border-gray-200 hover:bg-slate-400'
//       disabled={isPending}>
//       {isPending ? "Saving..." : buttonAction}
//     </button>
//     {state?.error && <p>{state.error}</p>}
//     {state?.success && <p>Saved!</p>}
//     <button
//       type='button'
//       className='p-3 border rounded-sm border-gray-200 hover:bg-slate-400'
//       onClick={() => {
//         onClose?.();
//       }}>
//       Close
//     </button>
//   </div>
// </form>
//   );
// }
