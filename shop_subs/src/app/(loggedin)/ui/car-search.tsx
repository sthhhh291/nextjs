"use client";

import { getCars } from "@/actions/car";
import { useState } from "react";
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
import { Search } from "lucide-react";

export default function CarSearch() {
  const [carList, setCarList] = useState<CarCustomer[]>([]);

  const handleSearch = async (formData: FormData) => {
    const carId = formData.get("carId") as string;
    try {
      const data = await getCars(1, 20, carId);
      setCarList(data.items);
    } catch (error) {
      console.error("Error fetching cars:", error);
    }
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
        <form action={handleSearch} className='flex flex-col gap-2 sm:flex-row'>
          <Input
            type='text'
            name='carId'
            aria-label='Search vehicles'
            placeholder='Customer, year, make, or model'
          />
          <Button type='submit' className='sm:w-auto'>
            <Search aria-hidden='true' />
            Search
          </Button>
        </form>
        <div className='grid gap-2 sm:grid-cols-2'>
          {carList.map((car: CarCustomer) => (
            <Button
              key={car.id}
              variant='outline'
              className='h-auto justify-start py-2 text-left'
              render={<Link href={`/cars/${car.id}`} />}>
              {car.year} {car.make} {car.car_model}
              <span className='ml-auto text-xs text-muted-foreground'>
                {car.first_name} {car.last_name}
              </span>
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
