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
import { getTotalsByQuarter } from "@/actions/totals";
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

type quarterTotals = {
  q1: Totals;
  q2: Totals;
  q3: Totals;
  q4: Totals;
};

export default function Quarter() {
  const years = Array.from(
    { length: new Date().getFullYear() - 2004 + 1 },
    (_, i) => i + 2004,
  );
  const items = years.map((item) => {
    return { label: item, value: item };
  });
  const [totals, setTotals] = useState<quarterTotals>();
  const [year, setYear] = useState(new Date().getFullYear());
  // async function handleChange() {
  //     const res = await getTotalsByQuarter(year)
  //     setTotals(res)
  // }
  useEffect(() => {
    getTotalsByQuarter(year).then((totals) => {
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
            <TableHead>Quarter</TableHead>
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
          <TableRow>
            <TableCell>1</TableCell>
            <TableCell>{formatCurrency(totals?.q1.labor_total || 0)}</TableCell>
            <TableCell>{formatCurrency(totals?.q1.parts_total || 0)}</TableCell>
            <TableCell>{formatCurrency(totals?.q1.oil_total || 0)}</TableCell>
            <TableCell>{formatCurrency(totals?.q1.sub_total || 0)}</TableCell>
            <TableCell>{formatCurrency(totals?.q1.shop_fees || 0)}</TableCell>
            <TableCell>{formatCurrency(totals?.q1.tax || 0)}</TableCell>
            <TableCell>{formatCurrency(totals?.q1.grand_total || 0)}</TableCell>
            <TableCell>{formatCurrency(totals?.q1.cost_total || 0)}</TableCell>
            <TableCell>{formatCurrency(totals?.q1.margin || 0)}</TableCell>
            <TableCell>
              {formatCurrency(totals?.q1.parts_margin || 0)}
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell>2</TableCell>
            <TableCell>{formatCurrency(totals?.q2.labor_total || 0)}</TableCell>
            <TableCell>{formatCurrency(totals?.q2.parts_total || 0)}</TableCell>
            <TableCell>{formatCurrency(totals?.q2.oil_total || 0)}</TableCell>
            <TableCell>{formatCurrency(totals?.q2.sub_total || 0)}</TableCell>
            <TableCell>{formatCurrency(totals?.q2.shop_fees || 0)}</TableCell>
            <TableCell>{formatCurrency(totals?.q2.tax || 0)}</TableCell>
            <TableCell>{formatCurrency(totals?.q2.grand_total || 0)}</TableCell>
            <TableCell>{formatCurrency(totals?.q2.cost_total || 0)}</TableCell>
            <TableCell>{formatCurrency(totals?.q2.margin || 0)}</TableCell>
            <TableCell>
              {formatCurrency(totals?.q2.parts_margin || 0)}
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell>3</TableCell>
            <TableCell>{formatCurrency(totals?.q3.labor_total || 0)}</TableCell>
            <TableCell>{formatCurrency(totals?.q3.parts_total || 0)}</TableCell>
            <TableCell>{formatCurrency(totals?.q3.oil_total || 0)}</TableCell>
            <TableCell>{formatCurrency(totals?.q3.sub_total || 0)}</TableCell>
            <TableCell>{formatCurrency(totals?.q3.shop_fees || 0)}</TableCell>
            <TableCell>{formatCurrency(totals?.q3.tax || 0)}</TableCell>
            <TableCell>{formatCurrency(totals?.q3.grand_total || 0)}</TableCell>
            <TableCell>{formatCurrency(totals?.q3.cost_total || 0)}</TableCell>
            <TableCell>{formatCurrency(totals?.q3.margin || 0)}</TableCell>
            <TableCell>
              {formatCurrency(totals?.q3.parts_margin || 0)}
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell>4</TableCell>
            <TableCell>{formatCurrency(totals?.q4.labor_total || 0)}</TableCell>
            <TableCell>{formatCurrency(totals?.q4.parts_total || 0)}</TableCell>
            <TableCell>{formatCurrency(totals?.q4.oil_total || 0)}</TableCell>
            <TableCell>{formatCurrency(totals?.q4.sub_total || 0)}</TableCell>
            <TableCell>{formatCurrency(totals?.q4.shop_fees || 0)}</TableCell>
            <TableCell>{formatCurrency(totals?.q4.tax || 0)}</TableCell>
            <TableCell>{formatCurrency(totals?.q4.grand_total || 0)}</TableCell>
            <TableCell>{formatCurrency(totals?.q4.cost_total || 0)}</TableCell>
            <TableCell>{formatCurrency(totals?.q4.margin || 0)}</TableCell>
            <TableCell>
              {formatCurrency(totals?.q4.parts_margin || 0)}
            </TableCell>
          </TableRow>
        </Table>
      </div>
    </div>
  );
}
