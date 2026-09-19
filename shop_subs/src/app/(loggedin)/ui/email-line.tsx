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
    <div className='flex flex-wrap  justify-center'>
      <p>
        {email.address} {email.type}
      </p>
      <EmailForm email={email} customer_id={customer_id} />
      <Button onClick={() => deleteEmailHandler(email.id)}><Trash /></Button>
    </div>
  );
}
