import { Estimate, Car, Customer, Sub_estimate } from '@/types';

export default function EstimatePrintPage(params: { estimate: Estimate, car: Car, customer: Customer, subs: Sub_estimate[] }) {
  const data = params.estimate;
  const car = params.car;
  const customer = params.customer;
  const subs = params.subs;

    return (
        <div className='p-4'>
            <h1 className='text-2xl font-bold mb-4'>{data?.estimate_type === 'estimate' ? 'Estimate' : 'Repair Order'} #{data.id}</h1>
            <div className='mb-4'>
                <h2 className='text-xl font-semibold'>Customer Information</h2>
                <p>Name: {customer.first_name} {customer.last_name}</p>
                <p>Phone: {customer.phones[0]?.number}</p>
                <p>Email: {customer.emails[0]?.address}</p>
            </div>
            <div className='mb-4'>
                <h2 className='text-xl font-semibold'>Car Information</h2>
                <p>Make: {car.make}</p>
                <p>Model: {car.car_model}</p>
                <p>Year: {car.year}</p>
                <p>VIN: {car.vin}</p>
                <p>Color: {car.color}</p>
            </div>
            <div className='mb-4'>
                <h2 className='text-xl font-semibold'>Estimate Details</h2>
                <p>Date: {new Date(data.date).toLocaleDateString()}</p>
                <p>Hours: {data.hours}</p>
                <p>Mileage: {data.mileage}</p>
                <p>Estimate Type: {data.estimate_type}</p>
            </div>
            <div className='mb-4'>
                <h2 className='text-xl font-semibold'>Notes</h2>
                <p>Notes</p> 
              </div>
        </div>
    );
}   