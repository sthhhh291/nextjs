'use client';
// import { useState } from 'react';
import {saveCustomer}  from '@/app/actions'
import { useActionState } from 'react';
import type { Customer } from '@/types';
import { useState, useEffect } from 'react';

export default function CustomerForm(params: {customer:Customer | null, isEditing:boolean, onSuccess?: () => void, onClose?: () => void}, ) {
    const data = params.customer
    const id = params.customer?.id || null;
    const onSuccess = params.onSuccess || undefined;
    const onClose = params.onClose || undefined;
    const [state,formAction,isPending] = useActionState(
        saveCustomer,
        {error:null, success:false, customer: null}
    )
    useEffect(() => {
        if (state?.success && onSuccess) {
            onSuccess();
        }
    }, [state, onSuccess]);
    // const [isEditing, setIsEditing] = useState(params.isEditing);
    const [firstName, setFirstName] = useState(data?.first_name || '');
    const [lastName, setLastName] = useState(data?.last_name ||'');
    const [notes, setNotes] = useState(data?.notes || '');
    // const formAction = data ? updateCustomer : createCustomer;
    // function handleSubmit() {
    // }
    const buttonAction = data ? "Update Customer" : "Create Customer";
    return (
        <div className='flex flex-col items-center min-h-screen py-2'>

        <form className='flex flex-col items-center content-center space-y-2' action={formAction}>
            <div className='flex flex-cols-1'>
            {data && <input type='hidden' name='id' value={id ?? ''} />}
            <input type="text" name="first_name" placeholder='first name...' value={firstName} onChange={e => setFirstName(e.target.value)} />
            <input type="text" name="last_name" placeholder='last name... ' value={lastName} onChange={e => setLastName(e.target.value)}/>
            <input type="text" name="notes" placeholder='notes....' value={notes} onChange={e=> setNotes(e.target.value
            )}/>
            <button className='p-4 border rounded-sm border-gray-200 hover:bg-slate-400' disabled={isPending}>{isPending ? "Saving..." : buttonAction}</button>
            {state?.error && <p>{state.error}</p>}
            {state?.success && <p>Saved!</p>}
            </div>
            <button className='p-4 border rounded-sm border-gray-200 hover:bg-slate-400' onClick={() => {onClose?.()}}>Close</button>
        </form>
            </div>
    )
   
}