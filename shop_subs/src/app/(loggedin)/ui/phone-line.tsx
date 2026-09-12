"use client";
import PhoneForm from "./phone-form";
import { Phone } from "@/types";
import { deletePhone } from "@/actions/phone";
import { Button } from "@/components/ui/button";

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
    <div className='border border-gray-300 rounded p-4 mt-4 text-sm font-bold'>
      <p>
        {phone.number} {phone.type}
      </p>
      <Button onClick={() => deletePhoneHandler(phone.id)}>Delete Phone</Button>
      <PhoneForm phone={phone} customer_id={customer_id} />
    </div>
  );
}
