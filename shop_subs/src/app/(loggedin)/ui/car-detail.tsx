"use client";

import { Car} from "@/types";
import CarLine from "./car-line";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import EstimateForm from "./estimate-form";

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
            <EstimateForm estimate={null} car_id={car.id} />
          </CardDescription>
        </CardHeader>
      </Card>
    </div>
  );
}
