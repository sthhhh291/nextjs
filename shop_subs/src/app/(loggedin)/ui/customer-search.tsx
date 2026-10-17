"use client";

import { getCustomers } from "@/actions/customer";
import { useState, useTransition } from "react";
import Link from "next/link";
import type { Customer } from "@/types";
import CustomerForm from "./customer-form";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { LoaderCircle, Search } from "lucide-react";

export default function CustomerSearch() {
  const [custList, setCustList] = useState<Customer[]>([]);
  const [isPending, startTransition] = useTransition();

  const handleSearch = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const customerId = formData.get("customerId") as string;

    startTransition(async () => {
      try {
        const data = await getCustomers(1, 20, customerId);
        setCustList(data.items);
      } catch (error) {
        console.error("Error fetching customers:", error);
      }
    });
  };

  return (
    <Card className='min-w-0'>
      <CardHeader className='border-b'>
        <div className='flex flex-wrap items-start justify-between gap-3'>
          <div className='space-y-1'>
            <CardTitle>Customer search</CardTitle>
            <CardDescription>
              Find an existing record or add a customer.
            </CardDescription>
          </div>
          <CustomerForm customer={null} />
        </div>
      </CardHeader>
      <CardContent className='space-y-4 pt-5'>
        <form
          onSubmit={handleSearch}
          className='flex flex-col gap-2 sm:flex-row'>
          <Input
            type='text'
            name='customerId'
            aria-label='Search customers'
            placeholder='Name or customer ID'
          />
          <Button type='submit' className='sm:w-auto' disabled={isPending}>
            {isPending ?
              <LoaderCircle className='animate-spin' aria-hidden='true' />
            : <Search aria-hidden='true' />}
            {isPending ? "Searching..." : "Search"}
          </Button>
        </form>
        <div className='grid gap-2 sm:grid-cols-2'>
          {custList.map((customer: Customer) => (
            <Link key={customer.id} href={`/customers/${customer.id}`}>
              <Button
                // key={customer.id}
                variant='outline'
                className='h-auto justify-start py-2 text-left'
                render={<Link href={`/customers/${customer.id}`} />}>
                {customer.first_name} {customer.last_name}
              </Button>
            </Link>
          ))}
          {custList.length === 0 && (
            <p className='text-sm text-muted-foreground sm:col-span-2'>
              No customers found. Try searching by name or customer ID.
            </p>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
