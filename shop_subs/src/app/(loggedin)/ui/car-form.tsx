"use client";
import { saveCar } from "@/app/actions";
import { useActionState } from "react";
import type { Car } from "@/types";
import { useState, useEffect } from "react";

export default function CarForm(params: {
  car: Car | null;
  isEditing: boolean;
  customer_id: number;
  onSuccess?: () => void;
  onClose?: () => void;
}) {
  const data = params.car;
  const id = params.car?.id || null;
  const customer_id = params.customer_id;
  const onSuccess = params.onSuccess || undefined;
  const onClose = params.onClose || undefined;
  const [state, formAction, isPending] = useActionState(saveCar, {
    error: null,
    success: false,
    car: null,
  });
  useEffect(() => {
    if (state?.success && onSuccess) {
      onSuccess();
    }
  }, [state, onSuccess]);
  const [year, setYear] = useState(
    data?.year?.toString() ?? (new Date().getFullYear() - 5).toString(),
  );
  const [make, setMake] = useState(data?.make || "");
  const [car_model, setCarModel] = useState(data?.car_model || "");
  const [engine, setEngine] = useState(data?.engine || "");
  const [vin, setVin] = useState(data?.vin || "");
  const [license, setLicense] = useState(data?.license || "");
  const [color, setColor] = useState(data?.color || "");
  const [fleet_number, setFleetNumber] = useState(data?.fleet_number || "");
  const [notes, setNotes] = useState(data?.notes || "");
  const buttonAction = data ? "Update Car" : "Create Car";
  return (
    <form
      className='border border-gray-200 p-4 rounded-sm justify-start'
      action={formAction}>
      {data && <input type='hidden' name='id' value={id ?? ""} />}
      <input type='hidden' name='customer_id' value={customer_id} />
      <div className='text-lg font-bold p-2 m-2'>
        <label
          htmlFor='year'
          className='block text-sm font-medium text-gray-700'>
          Year
        </label>
        <input
          type='number'
          name='year'
          min='1900'
          max={new Date().getFullYear() + 1}
          step='1'
          placeholder='year...'
          value={year}
          onChange={(e) => setYear(e.target.value)}
          className='border border-gray-300 rounded p-2 m-2 focus-within:outline-none focus-within:ring-2 focus-within:ring-blue-500 focus-within:border-transparent'
        />
      </div>
      <div className='text-lg font-bold p-2 m-2'>
        {/* {data ? "Edit Car" : "New Car"} */}
        <label
          htmlFor='make'
          className='block text-sm font-medium text-gray-700'>
          Make
        </label>
        <input
          type='text'
          name='make'
          placeholder='make...'
          value={make}
          onChange={(e) => setMake(e.target.value)}
        />
      </div>
      <div className='text-lg font-bold p-2 m-2'>
        <label
          htmlFor='car_model'
          className='block text-sm font-medium text-gray-700'>
          Model
        </label>
        <input
          type='text'
          name='car_model'
          placeholder='model...'
          value={car_model}
          onChange={(e) => setCarModel(e.target.value)}
        />
      </div>
      <div className='text-lg font-bold p-2 m-2'>
        <label
          htmlFor='engine'
          className='block text-sm font-medium text-gray-700'>
          Engine
        </label>
        <input
          type='text'
          name='engine'
          placeholder='engine...'
          value={engine}
          onChange={(e) => setEngine(e.target.value)}
        />
      </div>
      <div className='text-lg font-bold p-2 m-2'>
        <label
          htmlFor='vin'
          className='block text-sm font-medium text-gray-700'>
          VIN
        </label>
        <input
          type='text'
          name='vin'
          placeholder='VIN...'
          value={vin}
          onChange={(e) => setVin(e.target.value)}
        />
      </div>
      <div className='text-lg font-bold p-2 m-2'>
        <label
          htmlFor='color'
          className='block text-sm font-medium text-gray-700'>
          Color
        </label>
        <input
          type='text'
          name='color'
          placeholder='color...'
          value={color}
          onChange={(e) => setColor(e.target.value)}
        />
      </div>
      <div className='text-lg font-bold p-2 m-2'>
        <label
          htmlFor='license'
          className='block text-sm font-medium text-gray-700'>
          License Plate
        </label>
        <input
          type='text'
          name='license'
          placeholder='license...'
          value={license}
          onChange={(e) => setLicense(e.target.value)}
        />
      </div>
      <div className='text-lg font-bold p-2 m-2'>
        <label
          htmlFor='fleet_number'
          className='block text-sm font-medium text-gray-700'>
          Fleet Number
        </label>
        <input
          type='text'
          name='fleet_number'
          placeholder='fleet number...'
          value={fleet_number}
          onChange={(e) => setFleetNumber(e.target.value)}
        />
      </div>
      <div className='text-lg font-bold p-2 m-2'>
        <label
          htmlFor='notes'
          className='block text-sm font-medium text-gray-700'>
          Notes
        </label>
        <textarea
          name='notes'
          placeholder='notes...'
          value={notes}
          onChange={(e) => setNotes(e.target.value)}
        />
      </div>
      <div className='text-lg font-bold p-2 m-2'>
        <button
          className='p-3 border rounded-sm border-gray-200 hover:bg-slate-400'
          disabled={isPending}>
          {isPending ? "Saving..." : buttonAction}
        </button>
        {state?.error && <p>{state.error}</p>}
        {state?.success && <p>Saved!</p>}
        <button
          type='button'
          className='p-3 border rounded-sm border-gray-200 hover:bg-slate-400'
          onClick={() => {
            onClose?.();
          }}>
          Close
        </button>
      </div>
    </form>
  );
}
