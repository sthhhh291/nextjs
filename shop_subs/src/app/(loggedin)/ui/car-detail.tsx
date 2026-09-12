"use client";

import { Car} from "@/types";
import CarLine from "./car-line";
import CarForm from "./car-form";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";

export default function CarDetail(params: { car: Car }) {
  const car = params.car;

  return (
    <div>
      <Card>
        <CardHeader>
          <CardTitle>Car Details</CardTitle>
          <CardDescription>
            <CarLine car={car} />
          </CardDescription>
        </CardHeader>
      </Card>
      <Card>
        <CardHeader>
          <CardTitle>Actions</CardTitle>
          <CardDescription>
            <CarForm car={null} customer_id={car.customer_id} />
          </CardDescription>
        </CardHeader>
      </Card>
    </div>
  );
}
