"use client";
import { savePhone } from "@/app/actions";
import { useActionState } from "react";
import type { Phone } from "@/types";
import { useState, useEffect } from "react";

export default function PhoneForm(params: {
  phone: Phone | null;
  isEditing: boolean;
  customer_id: number;
  onSuccess?: () => void;
  onClose?: () => void;
}) {
  const data = params.phone;
  const id = params.phone?.id || null;
  const customer_id = params.customer_id;
  const onSuccess = params.onSuccess || undefined;
  const onClose = params.onClose || undefined;
  const [state, formAction, isPending] = useActionState(savePhone, {
    error: null,
    success: false,
    phone: null,
  });
  useEffect(() => {
    if (state?.success && onSuccess) {
      onSuccess();
    }
  }, [state, onSuccess]);
  const [type, setType] = useState(data?.type || "");
  const [number, setNumber] = useState(data?.number || "");
  const buttonAction = data ? "Update Phone" : "Create Phone";
  return (
    <form className='border border-gray-200 p-4 rounded-sm' action={formAction}>
      {data && <input type='hidden' name='id' value={id ?? ""} />}
      <input type='hidden' name='customer_id' value={customer_id} />
      <div className='text-lg font-bold p-2 m-2'>
        <label
          htmlFor='type'
          className='block text-sm font-medium text-gray-700'>
          Type
        </label>
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
      </div>
      <div className='text-lg font-bold p-2 m-2'>
        {/* {data ? "Edit Phone" : "New Phone"} */}
        <label
          htmlFor='number'
          className='block text-sm font-medium text-gray-700'>
          Number
        </label>
        <input
          type='text'
          name='number'
          placeholder='number...'
          value={number}
          onChange={(e) => setNumber(e.target.value)}
        />
      </div>
      <div className='text-lg font-bold p-2 m-2'>
        <button
          className='p-3 border rounded-sm border-gray-200 hover:bg-slate-400'
          disabled={isPending}>
          {isPending ? "Saving..." : buttonAction}
        </button>
        {state?.error && <p>{state.error}</p>}
        {state?.success && <p>Saved!</p>}
        {data && (
          <button
            type='button'
            className='p-3 border rounded-sm border-gray-200 hover:bg-slate-400'
            onClick={() => {
              onClose?.();
            }}>
            Close
          </button>
        )}
      </div>
    </form>
  );
}
