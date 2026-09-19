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
    <div>
      <Card>
        <CardHeader>
          <CardTitle>Customer Details</CardTitle>
          <CardDescription>
            <CustomerLine customer={customer} />
          </CardDescription>
        </CardHeader>
      </Card>
      <Card>
        <CardHeader>
          <CardTitle>Actions</CardTitle>
          <CardDescription>
            <PhoneForm phone={null} customer_id={customer.id} />
            <EmailForm email={null} customer_id={customer.id} />
            <AddressForm address={null} customer_id={customer.id} />
            <CarForm car={null} customer_id={customer.id} />
          </CardDescription>
        </CardHeader>
      </Card>
      <Card>
        <CardHeader>
          <CardTitle>Phone Numbers</CardTitle>
          <CardDescription>
            {phones.map((phone) => (
              <PhoneLine key={phone.id} phone={phone} />
            ))}
          </CardDescription>
          <CardTitle>Emails</CardTitle>
          <CardDescription>
            {emails.map((email) => (
              <EmailLine key={email.id} email={email} />
              // <div key={email.id}>{email.address} {email.type}</div>
            ))}
          </CardDescription>
          <CardTitle>Addresses</CardTitle>
          <CardDescription>
            {addresses.map((address) => (
              <AddressLine key={address.id} address={address} />
              // <div key={address.id}>{address.street} {address.city} {address.state} {address.zip_code}</div>
            ))}
          </CardDescription>
        </CardHeader>
      </Card>
    </div>
  );
}
