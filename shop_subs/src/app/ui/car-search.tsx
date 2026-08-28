"use client";

import { getCars } from "@/app/actions";
import { useState } from "react";
import Link from "next/link";
import type { CarCustomer } from "@/types";

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
    <div className='flex flex-col items-center min-h-screen py-2'>
      <h2 className='text-xl font-bold bg-center'>Car Search</h2>
      <form
        action={handleSearch}
        className='flex flex-col items-center space-y-2'>
        <input
          type='text'
          name='carId'
          placeholder='Car search here...'
          className='border border-gray-300 rounded px-3 py-2 mb-2'
        />
        <button
          type='submit'
          className='bg-blue-500 text-white rounded px-4 py-2 hover:bg-blue-600'>
          Search
        </button>
      </form>
      <div className='flex flex-col items-center mt-4'>
        {/* Render the list of cars here */}
        {carList.map((car: CarCustomer) => (
          <Link
            href={`/cars/${car.id}`}
            key={car.id}
            className='border border-gray-300 rounded p-2 mb-2 hover:bg-gray-300 w-full text-center'>
            {car.first_name} {car.last_name} {car.year} {car.make} {car.car_model}
          </Link>
        ))}
      </div>
    </div>
  );
}
