import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import type { Totals } from "@/types";
import { formatCurrency } from "@/lib/utils";

export default function ReportTable({
  totals,
  dateRange,
}: {
  totals: Totals | null;
  dateRange: { from: Date; to: Date } | undefined;
}) {
  return (
    <Table className='w-full mt-4 border border-gray-300 rounded-full'>
      {dateRange && (
        <TableHeader>
          <TableRow>
            <TableHead colSpan={9} className='text-center'>
              Report for {dateRange.from.toDateString()} to{" "}
              {dateRange.to.toDateString()}
            </TableHead>
          </TableRow>
        </TableHeader>
      )}

      <TableHeader>
        <TableRow>
          <TableHead>Labor Total</TableHead>
          <TableHead>Parts Total</TableHead>
          <TableHead>Oil Total</TableHead>
          <TableHead>Sub Total</TableHead>
          <TableHead>Tax</TableHead>
          <TableHead>Shop Fees</TableHead>
          <TableHead>Grand Total</TableHead>
          <TableHead>Cost Total</TableHead>
          <TableHead>Margin Total</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        <TableRow>
          <TableCell>
            {formatCurrency(totals ? totals.labor_total : 0)}
          </TableCell>
          <TableCell>
            {formatCurrency(totals ? totals.parts_total : 0)}
          </TableCell>
          <TableCell>{formatCurrency(totals ? totals.oil_total : 0)}</TableCell>
          <TableCell>{formatCurrency(totals ? totals.sub_total : 0)}</TableCell>
          <TableCell>{formatCurrency(totals ? totals.tax : 0)}</TableCell>
          <TableCell>{formatCurrency(totals ? totals.shop_fees : 0)}</TableCell>
          <TableCell>
            {formatCurrency(totals ? totals.grand_total : 0)}
          </TableCell>
          <TableCell>
            {formatCurrency(totals ? totals.cost_total : 0)}
          </TableCell>
          <TableCell>{formatCurrency(totals ? totals.margin : 0)}</TableCell>
        </TableRow>
      </TableBody>
      <TableFooter className='text-right'>
        <TableRow>
          <TableCell colSpan={7} className='text-right'>
            Grand Total for {dateRange?.from.toDateString()} to{" "}
            {dateRange?.to.toDateString()}:
            <strong className='ml-2'>
              {formatCurrency(totals ? totals.grand_total : 0)}
            </strong>
          </TableCell>
        </TableRow>
      </TableFooter>
    </Table>
  );
}
