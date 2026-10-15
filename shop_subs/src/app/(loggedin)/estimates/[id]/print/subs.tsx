import type { Sub_estimate, Labor, Part } from "@/types";

export default function SubEstimatePrint({ subs }: { subs: Sub_estimate[]; }) {
    return (
        <table className='w-full border-collapse border border-gray-300 mb-4'>
            {subs.map((sub) => (
                <>
                <thead key={sub.id}>
                    <tr>
                        <th className='border border-gray-300 p-2 text-left' colSpan={3}>{sub.description}</th>
                    </tr>
                </thead>
                <tbody key={sub.id}>
                    <tr>
                        <table className='w-full border-collapse border border-gray-300 mb-4'>
                            <thead>
                                <tr>
                                    <th className='border border-gray-300 p-2 text-left'>Labor</th>
                                </tr>
                            </thead>
                            <tbody>
                                {sub.labor && sub.labor.length > 0 ? (
                                    sub.labor.map((labor: Labor) => (
                                        <tr key={labor.id}>
                                            <td className='border border-gray-300 p-2'>{labor.description}</td>
                                            <td className='border border-gray-300 p-2'>${labor.price.toFixed(2)}</td>
                                        </tr>
                                    ))
                                ) : (
                                    <tr>
                                        <td className='border border-gray-300 p-2' colSpan={2}>No labor items available.</td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                        <table className='w-full border-collapse border border-gray-300 mb-4'>
                            <thead>
                                <tr>
                                    <th className='border border-gray-300 p-2 text-left'>Parts</th>
                                </tr>
                            </thead>
                            <tbody>
                                {sub.parts && sub.parts.length > 0 ? (
                                    sub.parts.map((part: Part) => (
                                        <tr key={part.id}>
                                            <td className='border border-gray-300 p-2'>{part.description}</td>
                                            <td className='border border-gray-300 p-2'>${part.price.toFixed(2)}</td>
                                        </tr>
                                    ))
                                ) : (
                                    <tr>
                                        <td className='border border-gray-300 p-2' colSpan={2}>No parts items available.</td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                        <table className='w-full border-collapse border border-gray-300 mb-4'>
                            <thead>
                                <tr>
                                    <th className='border border-gray-300 p-2 text-left'>Oil</th>
                                </tr>
                            </thead>
                            <tbody>
                                {sub.oil && sub.oil.length > 0 ? (
                                    sub.oil.map((oil: Part) => (
                                        <tr key={oil.id}>
                                            <td className='border border-gray-300 p-2'>{oil.description}</td>
                                            <td className='border border-gray-300 p-2'>${oil.price.toFixed(2)}</td> 
                                        </tr>
                                    ))
                                ) : (
                                    <tr>
                                        <td className='border border-gray-300 p-2' colSpan={2}>No oil items available.</td>
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