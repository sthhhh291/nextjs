import type { Estimate, Car, Customer } from "@/types";

export default function EstimateDetailPrint({ estimate, car, customer }: { estimate: Estimate; car: Car; customer: Customer;  }) {
  return (
    <div>
        {/* <h1 className='text-2xl font-bold mb-4'>{estimate?.estimate_type === 'estimate' ? 'Estimate' : 'Repair Order'} #{estimate.id}</h1> */}
        <table className='w-full border-collapse border border-gray-300 mb-2'>
            <thead>
                <tr>
                    <th className='border border-gray-300 p-2 text-left'>Customer Information</th>
                    <th className='border border-gray-300 p-2 text-left'>Car Information</th>
                    <th className='border border-gray-300 p-2 text-left'>Estimate Information</th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td className='border border-gray-300 p-2'>
                        <p>{customer.first_name} {customer.last_name}</p>
                        <p>{customer.addresses[0]?.street}</p>
                        <p>{customer.addresses[0]?.city}, {customer.addresses[0]?.state} {customer.addresses[0]?.zip_code}</p>
                        <p>{customer.phones[0]?.number}</p>
                        <p>{customer.emails[0]?.address}</p>
                    </td>
                    <td className='border border-gray-300 p-2'>
                        <p>{car.year} {car.make} {car.car_model} </p>
                        <p>Engine: {car.engine}</p>
                        <p>License Plate: {car.license}</p>
                        <p>Vehicle Identification Number: {car.vin}</p>
                    </td>
                    <td className='border border-gray-300 p-2'>
                        <p>Id: {estimate.id}</p>
                        <p>Date: {new Date(estimate.date).toLocaleDateString()}</p>
                        <p>Mileage: {estimate.mileage}</p>
                        <p>Estimate Type: {estimate.estimate_type === 'estimate' ? 'Estimate' : 'Repair Order'}</p>
                    </td>
                </tr>
            </tbody>
        </table>
    </div>
  );
}