"use client";
import PhoneForm from "./phone-form";
import { Phone } from "@/types";
import { deletePhone } from "@/actions/phone";
import { Button } from "@/components/ui/button";
import { Trash } from "lucide-react";

export default function PhoneLine(params: { phone: Phone }) {
  const phone = params.phone;
  const customer_id = phone.customer_id as number;
  const deletePhoneHandler = async (id: number) => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this phone number?",
    );
    if (confirmed) {
      try {
        await deletePhone(id, customer_id);
      } catch (error) {
        console.error("Error deleting phone:", error);
      }
    }
  };

  return (
    <div className='flex flex-wrap  justify-center'>
      <p>
        {phone.number} {phone.type}
      </p>
      <PhoneForm phone={phone} customer_id={customer_id} />
      <Button onClick={() => deletePhoneHandler(phone.id)}><Trash /></Button>
    </div>
  );
}
