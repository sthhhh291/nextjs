"use client";

import { Car, Phone, Email, Address } from "@/types";
import CarLine from "./car-line";
import PhoneForm from "./phone-form";
import CarForm from "./car-form";
import PhoneLine from "./phone-line";
import { useState } from "react";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardAction,
} from "@/components/ui/card";

export default function CarDetail(params: { car: Car }) {
  const car = params.car;
  const [isEditingCar, setIsEditingCar] = useState(false);

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
