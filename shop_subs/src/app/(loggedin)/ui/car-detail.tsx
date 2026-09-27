"use client";

import { Car } from "@/types";
import CarLine from "./car-line";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import EstimateForm from "./estimate-form";

export default function CarDetail(params: { car: Car }) {
  const car = params.car;

  return (
    <Card className='min-w-0'>
      <CardHeader className='border-b'>
        <CardTitle>Vehicle details</CardTitle>
        <CardDescription>
          <CarLine car={car} />
        </CardDescription>
      </CardHeader>
      <CardContent className='space-y-3 pt-5'>
        <h3 className='text-sm font-semibold'>Actions</h3>
        <EstimateForm estimate={null} car_id={car.id} />
      </CardContent>
    </Card>
  );
}
