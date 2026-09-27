"use client";
import EmailForm from "./email-form";
import { Email } from "@/types";
import { deleteEmail } from "@/actions/email";
import { Button } from "@/components/ui/button";
import { Trash } from "lucide-react";

export default function EmailLine(params: { email: Email }) {
  const email = params.email;
  const customer_id = email.customer_id as number;
  const deleteEmailHandler = async (id: number) => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this email number?",
    );
    if (confirmed) {
      try {
        await deleteEmail(id, customer_id);
      } catch (error) {
        console.error("Error deleting email:", error);
      }
    }
  };

  return (
    <div className='flex flex-wrap items-center justify-between gap-3 px-3 py-2.5 text-sm'>
      <p className='min-w-0 flex-1'>
        {email.address} {email.type}
      </p>
      <div className='flex items-center gap-1'>
        <EmailForm email={email} customer_id={customer_id} />
        <Button
          type='button'
          variant='ghost'
          size='icon-sm'
          aria-label='Delete email'
          title='Delete email'
          className='text-destructive hover:bg-destructive/10 hover:text-destructive'
          onClick={() => deleteEmailHandler(email.id)}>
          <Trash aria-hidden='true' />
        </Button>
      </div>
    </div>
  );
}
