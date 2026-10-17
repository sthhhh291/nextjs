"use client";

import { getCars } from "@/actions/car";
import { useState, useTransition } from "react";
import Link from "next/link";
import type { CarCustomer } from "@/types";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Search, LoaderCircle } from "lucide-react";

export default function CarSearch() {
  const [carList, setCarList] = useState<CarCustomer[]>([]);
  const [isPending, startTransition] = useTransition();

  const handleSearch = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const carId = formData.get("carId") as string;
    const customerId = formData.get("customerId") as string;
    startTransition(async () => {
      try {
        const data = await getCars(1, 20, customerId, carId);
        setCarList(data.items);
      } catch (error) {
        console.error("Error fetching cars:", error);
      }
    });
  };

  return (
    <Card className='min-w-0'>
      <CardHeader className='border-b'>
        <div className='space-y-1'>
          <CardTitle>Vehicle search</CardTitle>
          <CardDescription>
            Search by customer, year, make, or model.
          </CardDescription>
        </div>
      </CardHeader>
      <CardContent className='space-y-4 pt-5'>
        <form
          onSubmit={handleSearch}
          className='flex flex-col gap-2 sm:flex-row'>
          <Input
            type='text'
            name='customerId'
            aria-label='Search Customers'
            placeholder='Search Customers'
          />
          <Input
            type='text'
            name='carId'
            aria-label='Search vehicles'
            placeholder='Search Cars'
          />
          {isPending ?
            <Button type='submit' className='sm:w-auto' disabled>
              <LoaderCircle className='mr-2 h-4 w-4 animate-spin' />
              Searching...
            </Button>
          : <Button type='submit' className='sm:w-auto'>
              <Search aria-hidden='true' />
              Search
            </Button>
          }
        </form>
        <div className='grid gap-2 sm:grid-cols-2'>
          {carList.map((car: CarCustomer) => (
            <Button
              key={car.id}
              variant='outline'
              className='h-auto justify-start py-2 text-left'>
              <Link
                href={`/cars/${car.id}`}
                className='flex w-full items-center gap-2'>
                {car.car}
                <span className='ml-auto text-xs text-muted-foreground'>
                  {car.customer}
                </span>
              </Link>
            </Button>
          ))}
          {carList.length === 0 && (
            <p className='text-sm text-muted-foreground sm:col-span-2'>
              Search results will appear here.
            </p>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
