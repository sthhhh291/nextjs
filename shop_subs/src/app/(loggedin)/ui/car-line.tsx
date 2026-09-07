"use client";
import { useState } from "react";
import CarForm from "./car-form";
import { Car } from "@/types";
import { deleteCar } from "@/app/actions";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function CarLine(params: { car: Car }) {
  const [isEditing, setIsEditing] = useState(false);
  const car = params.car;
  const customer_id = car.customer_id as number;
  const updateCar = () => {
    setIsEditing(false);
  };
  const deleteCarHandler = async (id: number) => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this car number?",
    );
    if (confirmed) {
      try {
        await deleteCar(id, customer_id);
      } catch (error) {
        console.error("Error deleting car:", error);
      }
    }
  };

  return (
    <div className='border border-gray-300 rounded p-4 mt-4 text-sm font-bold'>
      <Button>
        <Link href={`/cars/${car.id}`}>
          {car.year} {car.make} {car.car_model}
        </Link>
      </Button>
      <CarForm car={car} customer_id={customer_id} />
      <Button onClick={() => deleteCarHandler(car.id)}>Delete Car</Button>
    </div>
  );
}
