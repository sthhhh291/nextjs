import type { Totals } from "@/types";

export default function TotalsPrint({ totals }: { totals: Totals; }) {
    return (
        <table className='w-full border-collapse border border-gray-300 mb-4'>
            <thead>
                <tr>
                    <th className='border border-gray-300 p-2 text-left'>Total</th>
                    <th className='border border-gray-300 p-2 text-left'>Amount</th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td className='border border-gray-300 p-2'>Subtotal</td>
                    <td className='border border-gray-300 p-2'>${totals.sub_total.toFixed(2)}</td>
                </tr>
                <tr>
                    <td className='border border-gray-300 p-2'>Tax</td>
                    <td className='border border-gray-300 p-2'>${totals.tax.toFixed(2)}</td>
                </tr>
                <tr>
                    <td className='border border-gray-300 p-2'>Total</td>
                    <td className='border border-gray-300 p-2'>${totals.grand_total.toFixed(2)}</td>
                </tr>
            </tbody>
        </table>
    )
}