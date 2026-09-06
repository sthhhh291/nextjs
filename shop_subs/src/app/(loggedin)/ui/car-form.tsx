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
  const [year, setYear] = useState(data?.year || "");
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
    <form className='border border-gray-200 p-4 rounded-sm' action={formAction}>
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
          max={new Date().getFullYear()+1}
          defaultValue={new Date().getFullYear() - 5}
          step='1'
          placeholder='year...'
          value={year}
          onChange={(e) => setYear(e.target.value)}
          className='border border-gray-300 rounded p-2 m-2' />
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
          htmlFor='car_model'>
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
          htmlFor='engine'>
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
          htmlFor='vin'>
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
          htmlFor='color'>
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
          htmlFor='license'>
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
          htmlFor='fleet_number'>
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
          htmlFor='notes'>
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
        {data && (
          <button
            type='button'
            className='p-3 border rounded-sm border-gray-200 hover:bg-slate-400'
            onClick={() => {
              onClose?.();
            }}>
            Close
          </button>
        )}
      </div>
    </form>
  );
}
