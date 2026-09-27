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
    <div className='flex flex-wrap items-center justify-between gap-3 px-3 py-2.5 text-sm'>
      <p className='min-w-0 flex-1'>
        {phone.number} {phone.type}
      </p>
      <div className='flex items-center gap-1'>
        <PhoneForm phone={phone} customer_id={customer_id} />
        <Button
          type='button'
          variant='ghost'
          size='icon-sm'
          aria-label='Delete phone number'
          title='Delete phone number'
          className='text-destructive hover:bg-destructive/10 hover:text-destructive'
          onClick={() => deletePhoneHandler(phone.id)}>
          <Trash aria-hidden='true' />
        </Button>
      </div>
    </div>
  );
}
