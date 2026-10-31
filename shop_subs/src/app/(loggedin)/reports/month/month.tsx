"use client";
import {
  Select,
  SelectContent,
  SelectTrigger,
  SelectValue,
  SelectGroup,
  SelectLabel,
  SelectItem,
} from "@/components/ui/select";
import { getTotalsByMonth } from "@/actions/totals";
import { useState, useEffect } from "react";
import { Totals } from "@/types";
import { formatCurrency } from "@/lib/utils";
import {
  Table,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

type monthTotals = Totals[]

export default function Month() {
  const years = Array.from(
    { length: new Date().getFullYear() - 2004 + 1 },
    (_, i) => i + 2004,
  );
  const items = years.map((item) => {
    return { label: item, value: item };
  });
  const [totals, setTotals] = useState<monthTotals>();
  const [year, setYear] = useState(new Date().getFullYear());
  // async function handleChange() {
  //     const res = await getTotalsByQuarter(year)
  //     setTotals(res)
  // }
  useEffect(() => {
    getTotalsByMonth(year).then((totals) => {
      console.log("Totals for year: ", year, totals);
      setTotals(totals);
    });
  }, [year]);
  return (
    <div>
      <Select
        value={String(year)}
        onValueChange={(value) => setYear(Number(value))}>
        <SelectTrigger className='w-full max-w-48'>
          <SelectValue />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            <SelectLabel>Years</SelectLabel>
            {items.map((item) => (
              <SelectItem key={item.value} value={String(item.value)}>
                {item.label}
              </SelectItem>
            ))}
          </SelectGroup>
        </SelectContent>
      </Select>
      <div>
        <Table>
          <TableHeader>
            <TableHead>Month</TableHead>
            <TableHead>Labor</TableHead>
            <TableHead>Parts</TableHead>
            <TableHead>Oil</TableHead>
            <TableHead>Subtotal</TableHead>
            <TableHead>Shop Fees</TableHead>
            <TableHead>Tax</TableHead>
            <TableHead>Total</TableHead>
            <TableHead>Cost</TableHead>
            <TableHead>Margin</TableHead>
            <TableHead>Parts Margin</TableHead>
          </TableHeader>
          {totals?.map(total => 
            <TableRow key={total.date}>
            <TableCell>1</TableCell>
            <TableCell>{formatCurrency(total.labor_total || 0)}</TableCell>
            <TableCell>{formatCurrency(total.parts_total || 0)}</TableCell>
            <TableCell>{formatCurrency(total.oil_total || 0)}</TableCell>
            <TableCell>{formatCurrency(total.sub_total || 0)}</TableCell>
            <TableCell>{formatCurrency(total.shop_fees || 0)}</TableCell>
            <TableCell>{formatCurrency(total.tax || 0)}</TableCell>
            <TableCell>{formatCurrency(total.grand_total || 0)}</TableCell>
            <TableCell>{formatCurrency(total.cost_total || 0)}</TableCell>
            <TableCell>{formatCurrency(total.margin || 0)}</TableCell>
            <TableCell>
              {formatCurrency(total.parts_margin || 0)}
            </TableCell>
          </TableRow>
          )}
        </Table>
      </div>
    </div>
  );
}
