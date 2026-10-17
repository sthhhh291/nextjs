import type { Sub_estimate, Labor, Part } from "@/types";
import { formatCurrency } from "@/lib/utils";

export default function SubEstimatePrint({ subs }: { subs: Sub_estimate[]; }) {
    return (
        <table className='w-full border-collapse border border-gray-300'>
            {subs.map((sub) => (
                <>
                <thead key={sub.id}>
                    <tr>
                        <th className='border border-gray-300 p-2 text-left' colSpan={3}>{sub.description}</th>
                    </tr>
                </thead>
                <tbody key={sub.id}>
                    <tr>
                        <table className='w-full border-collapse border border-gray-300'>
                            <thead>
                                <tr>
                                    <th className='border border-gray-300 p-2 text-left'>Labor</th>
                                </tr>
                                <tr>
                                    <th className='border border-gray-300 p-2 text-left'>Description</th>
                                    <th className='border border-gray-300 p-2 text-left'>Price</th>
                                </tr>
                            </thead>
                            <tbody>
                                {sub.labor && sub.labor.length > 0 ? (
                                    sub.labor.map((labor: Labor) => (
                                        <tr key={labor.id}>
                                            <td className='border border-gray-300 p-2'>{labor.description}</td>
                                            <td className='border border-gray-300 p-2'>{formatCurrency(labor.price)}</td>
                                        </tr>
                                    ))
                                ) : (
                                    <tr>
                                        <td className='border border-gray-300 p-2' colSpan={2}>No labor items available.</td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                        <table className='w-full border-collapse border border-gray-300'>
                            <thead>
                                <tr>
                                    <th className='border border-gray-300 p-2 text-left'>Parts</th>
                                </tr>
                                <tr>
                                    <th className='border border-gray-300 p-2 text-left'>Description</th>
                                    <th className='border border-gray-300 p-2 text-left'>Manufacturer</th>
                                    <th className='border border-gray-300 p-2 text-left'>Part Number</th>
                                    <th className='border border-gray-300 p-2 text-left'>Quantity</th>
                                    <th className='border border-gray-300 p-2 text-left'>Price</th>
                                    <th className='border border-gray-300 p-2 text-left'>Extended</th>
                                </tr>
                            </thead>
                            <tbody>
                                {sub.parts && sub.parts.length > 0 ? (
                                    sub.parts.map((part: Part) => (
                                        <tr key={part.id}>
                                            <td className='border border-gray-300 p-2'>{part.description}</td>
                                            <td className='border border-gray-300 p-2'>{part.manufacturer}</td>
                                            <td className='border border-gray-300 p-2'>{part.part_number}</td>
                                            <td className='border border-gray-300 p-2'>{part.quantity}</td>
                                            <td className='border border-gray-300 p-2'>{formatCurrency(part.price)}</td>
                                            <td className='border border-gray-300 p-2'>{formatCurrency(part.price * part.quantity)}</td>
                                        </tr>
                                    ))
                                ) : (
                                    <tr>
                                        <td className='border border-gray-300 p-2' colSpan={6}>No parts items available.</td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                        <table className='w-full border-collapse border border-gray-300'>
                            <thead>
                                <tr>
                                    <th className='border border-gray-300 p-2 text-left'>Oil</th>
                                </tr>
                                <tr>
                                    <th className='border border-gray-300 p-2 text-left'>Description</th>
                                    <th className='border border-gray-300 p-2 text-left'>Manufacturer</th>
                                    <th className='border border-gray-300 p-2 text-left'>Part Number</th>
                                    <th className='border border-gray-300 p-2 text-left'>Quantity</th>
                                    <th className='border border-gray-300 p-2 text-left'>Price</th>
                                    <th className='border border-gray-300 p-2 text-left'>Extended</th>
                                </tr>
                            </thead>
                            <tbody>
                                {sub.oil && sub.oil.length > 0 ? (
                                    sub.oil.map((oil: Part) => (
                                        <tr key={oil.id}>
                                            <td className='border border-gray-300 p-2'>{oil.description}</td>
                                            <td className='border border-gray-300 p-2'>{oil.manufacturer}</td>
                                            <td className='border border-gray-300 p-2'>{oil.part_number}</td>
                                            <td className='border border-gray-300 p-2'>{oil.quantity}</td>
                                            <td className='border border-gray-300 p-2'>{formatCurrency(oil.price)}</td>
                                            <td className='border border-gray-300 p-2'>{formatCurrency(oil.price * oil.quantity)}</td>
                                        </tr>
                                    ))
                                ) : (
                                    <tr>
                                        <td className='border border-gray-300 p-2' colSpan={6}>No oil items available.</td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </tr>
                </tbody>
            </>
            ))}
        </table>
    )
}