"use client";

import { createColumnHelper } from "@tanstack/react-table";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { MoreHorizontal, ArrowUpDown } from "lucide-react";

import type { Totals } from "@/types";

import { type DataTableFeatures } from "./data-table-features";

// export type Totals = Totals;

// export type Totals = {
//   estimate_id: number;
//   sub_estimate_id: number;
//   employee_id: number;
//   date: string;
//   labor_total: number;
//   parts_total: number;
//   oil_total: number;
//   sub_total: number;
//   tax: number;
//   shop_fees: number;
//   grand_total: number;
//   cost_total: number;
//   parts_margin: number;
//   margin: number;
// };

// Use `accessor` for data columns and `display` for columns without one.
const columnHelper = createColumnHelper<DataTableFeatures, Totals>();

export const columns = columnHelper.columns([
  columnHelper.accessor("labor_total", {
    header: "Labor Total",
  }),
  columnHelper.accessor("parts_total", {
    header: ({column}) => (
      <Button
        variant='ghost'
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
      >
        Parts Total
        <ArrowUpDown className='ml-2 h-4 w-4' />
      </Button>
    ),
  }),
  columnHelper.accessor("oil_total", {
    header: () => <div className='text-right'>Oil Total</div>,
    cell: ({ row }) => {
      const amount = parseFloat(row.getValue("oil_total") as unknown as string);
      const formatted = new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "USD",
      }).format(amount);

      return <div className='text-right font-medium'>{formatted}</div>;
    },
  }),
  columnHelper.display({
    id: "actions",
    cell: ({ row }) => {
      const payment = row.original;

      return (
        <DropdownMenu>
          <DropdownMenuTrigger
            render={<Button variant='ghost' className='h-8 w-8 p-0' />}>
            <span className='sr-only'>Open menu</span>
            <MoreHorizontal className='h-4 w-4' />
          </DropdownMenuTrigger>
          <DropdownMenuContent align='end'>
            <DropdownMenuGroup>
              <DropdownMenuLabel>Actions</DropdownMenuLabel>
              <DropdownMenuItem
                onClick={() => navigator.clipboard.writeText(payment.estimate_id.toString())}>
                Copy payment ID
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem>View customer</DropdownMenuItem>
              <DropdownMenuItem>View payment details</DropdownMenuItem>
            </DropdownMenuGroup>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  }),
]);
