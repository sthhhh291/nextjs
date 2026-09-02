"use client";
// import { useState } from 'react';
import { saveCustomer } from "@/app/actions";
import { useActionState } from "react";
import type { Customer } from "@/types";
import { useState, useEffect } from "react";

export default function CustomerForm(params: {
  customer: Customer | null;
  isEditing: boolean;
  onSuccess?: () => void;
  onClose?: () => void;
}) {
  const data = params.customer;
  const id = params.customer?.id || null;
  const onSuccess = params.onSuccess || undefined;
  const onClose = params.onClose || undefined;
  const [state, formAction, isPending] = useActionState(saveCustomer, {
    error: null,
    success: false,
    customer: null,
  });
  useEffect(() => {
    if (state?.success && onSuccess) {
      onSuccess();
    }
  }, [state, onSuccess]);
  // const [isEditing, setIsEditing] = useState(params.isEditing);
  const [firstName, setFirstName] = useState(data?.first_name || "");
  const [lastName, setLastName] = useState(data?.last_name || "");
  const [notes, setNotes] = useState(data?.notes || "");
  // const formAction = data ? updateCustomer : createCustomer;
  // function handleSubmit() {
  // }
  const buttonAction = data ? "Update Customer" : "Create Customer";
  return (
    <form className='border border-gray-200 p-4 rounded-sm' action={formAction}>
      {/* <div className='flex flex-col items-center content-center space-y-2'> */}
      {data && <input type='hidden' name='id' value={id ?? ""} />}
      <div className='text-lg font-bold p-2 m-2'>
        {/* {data ? "Edit Customer" : "New Customer"} */}
        <label
          htmlFor='first_name'
          className='block text-sm font-medium text-gray-700'>
          First Name
        </label>
        <input
          type='text'
          name='first_name'
          placeholder='first name...'
          value={firstName}
          onChange={(e) => setFirstName(e.target.value)}
        />
      </div>
      <div className='text-lg font-bold p-2 m-2'>
        {/* {data ? "Edit Customer" : "New Customer"} */}
        <label
          htmlFor='last_name'
          className='block text-sm font-medium text-gray-700'>
          Last Name
        </label>
        <input
          type='text'
          name='last_name'
          placeholder='last name... '
          value={lastName}
          onChange={(e) => setLastName(e.target.value)}
        />
      </div>
      <div className='text-lg font-bold p-2 m-2'>
        {/* {data ? "Edit Customer" : "New Customer"} */}
        <label
          htmlFor='notes'
          className='block text-sm font-medium text-gray-700'>
          Notes
        </label>
        <textarea
          //   type='text'
          name='notes'
          placeholder='notes....'
          value={notes}
          onChange={(e) => setNotes(e.target.value)}
        />
      </div>
      <div className='text-lg font-bold p-2 m-2'>
        <button
          className='p-4 border rounded-sm border-gray-200 hover:bg-slate-400'
          disabled={isPending}>
          {isPending ? "Saving..." : buttonAction}
        </button>
        {state?.error && <p>{state.error}</p>}
        {state?.success && <p>Saved!</p>}
        {/* </div> */}
        {data && (
          <button
            className='p-4 border rounded-sm border-gray-200 hover:bg-slate-400'
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
