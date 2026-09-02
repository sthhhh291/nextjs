'use client';
import { useState } from "react"
import CustomerForm from "./customer-form"
import { Customer } from "@/types"
// import { revalidate } from "next/cache";
// import { useEffect } from "react";


export default function CustomerLine(params:{customer:Customer}) {
    const [isEditing, setIsEditing] = useState(false)
    const customer = params.customer
    const updateCustomer = () => {
        setIsEditing(false)
    }
    return (
        <div>
            {isEditing
            ? <CustomerForm customer={customer} isEditing={isEditing} onSuccess={updateCustomer} onClose={() => setIsEditing(false)} />
            : 
            <>
            <p>{customer.first_name} {customer.last_name}</p>
            <p>{customer.notes}</p>
            <button className='p-4 border rounded-sm border-gray-200 hover:bg-slate-400' onClick={() => setIsEditing(true)}>Edit Customer</button>
            </>
            }
        </div>
    )
} 