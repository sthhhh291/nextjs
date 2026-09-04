"use client";
import { useState } from "react";
import PhoneForm from "./phone-form";
import { Phone } from "@/types";
import { deletePhone } from "@/app/actions";
import { revalidatePath } from "next/dist/server/web/spec-extension/revalidate";

export default function PhoneLine(params: { phone: Phone }) {
  const [isEditing, setIsEditing] = useState(false);
  const phone = params.phone;
  const customer_id = phone.customer_id as number;
  const updatePhone = () => {
    setIsEditing(false);
  };
  const deletePhoneHandler = async (id: number) => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this phone number?"
    );
    if (confirmed) {
      try {
        await deletePhone(id);
        revalidatePath(`/customers/${customer_id}`);
      } catch (error) {
        console.error("Error deleting phone:", error);
      }
    }
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
          <button
            className='p-2 border rounded-sm border-gray-200 hover:bg-slate-400'
            onClick={() => deletePhoneHandler(phone.id)}>
            Delete Phone
          </button>
        </>
      }
    </div>
  );
}
