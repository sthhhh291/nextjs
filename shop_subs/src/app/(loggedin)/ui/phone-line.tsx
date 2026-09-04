"use client";
import { useState } from "react";
import PhoneForm from "./phone-form";
import { Phone } from "@/types";

export default function PhoneLine(params: { phone: Phone }) {
  const [isEditing, setIsEditing] = useState(false);
  const phone = params.phone;
  const customer_id = phone.customer_id as number;
  const updatePhone = () => {
    setIsEditing(false);
  };
  return (
    <div className='border border-gray-300 rounded p-4 mt-4 text-sm font-bold'>
      {isEditing ?
        <PhoneForm
          phone={phone}
          customer_id={customer_id}
          isEditing={isEditing}
          onSuccess={updatePhone}
          onClose={() => setIsEditing(false)}
        />
      : <>
          <p>
           {phone.number} {phone.type} 
          </p>
          <button
            className='p-2 border rounded-sm border-gray-200 hover:bg-slate-400'
            onClick={() => setIsEditing(true)}>
            Edit Phone
          </button>
        </>
      }
    </div>
  );
}
