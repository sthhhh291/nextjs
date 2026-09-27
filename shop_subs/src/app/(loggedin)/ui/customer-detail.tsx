"use client";

import { Customer, Phone, Email, Address } from "@/types";
import CustomerLine from "./customer-line";
import PhoneForm from "./phone-form";
import CarForm from "./car-form";
import PhoneLine from "./phone-line";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import AddressForm from "./address-form";
import EmailForm from "./email-form";
import EmailLine from "./email-line";
import AddressLine from "./address-line";

export default function CustomerDetail(params: {
  customer: Customer;
  phones: Phone[];
  emails: Email[];
  addresses: Address[];
}) {
  const customer = params.customer;
  const emails = params.emails;
  const phones = params.phones;
  const addresses = params.addresses;

  return (
    <Card className='min-w-0'>
      <CardHeader className='border-b'>
        <div className='flex flex-wrap items-start justify-between gap-3'>
          <div className='space-y-1'>
            <CardTitle>Customer</CardTitle>
            <CardDescription>
              <CustomerLine customer={customer} />
            </CardDescription>
          </div>
        </div>
      </CardHeader>
      <CardContent className='space-y-5 pt-5'>
        <section className='space-y-3'>
          <div className='flex flex-wrap items-center justify-between gap-3'>
            <h3 className='text-sm font-semibold'>Contact details</h3>
            <div className='flex flex-wrap gap-2'>
              <PhoneForm phone={null} customer_id={customer.id} />
              <EmailForm email={null} customer_id={customer.id} />
              <AddressForm address={null} customer_id={customer.id} />
              <CarForm car={null} customer_id={customer.id} />
            </div>
          </div>
          <div className='divide-y rounded-lg border'>
            {phones.map((phone) => (
              <PhoneLine key={phone.id} phone={phone} />
            ))}
            {emails.map((email) => (
              <EmailLine key={email.id} email={email} />
            ))}
            {addresses.map((address) => (
              <AddressLine key={address.id} address={address} />
            ))}
            {phones.length + emails.length + addresses.length === 0 && (
              <p className='px-3 py-4 text-sm text-muted-foreground'>
                No contact details have been added.
              </p>
            )}
          </div>
        </section>
      </CardContent>
    </Card>
  );
}
