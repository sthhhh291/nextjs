import type { Totals } from "@/types";
import { formatCurrency } from "@/lib/utils";

export default function TotalsPrint({ totals }: { totals: Totals }) {
  return (
    <table className='w-full border-collapse border border-gray-300'>
      <thead>
        <tr>
          <th className='border border-gray-300 p-2 text-left'>Subtotal</th>
          <th className='border border-gray-300 p-2 text-left'>Tax</th>
          <th className='border border-gray-300 p-2 text-left'>Shop Fees</th>
          <th className='border border-gray-300 p-2 text-left'>Grand Total</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td className='border border-gray-300 p-2'>
            {formatCurrency(totals?.sub_total || 0)}
          </td>
          <td className='border border-gray-300 p-2'>
            {formatCurrency(totals?.tax || 0)}
          </td>
          <td className='border border-gray-300 p-2'>
            {formatCurrency(totals?.shop_fees || 0)}
          </td>
          <td className='border border-gray-300 p-2'>
            {formatCurrency(totals?.grand_total || 0)}
          </td>
        </tr>
      </tbody>
    </table>
  );
}
