"use client";

import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { useState, useEffect } from "react";
import { getTotalsByRange } from "@/actions/totals";
import type { Totals } from "@/types";
import { formatDate, formatCurrency } from "@/lib/utils";
import ReportTable from "./report-table";
export default function Report() {
  const [dateRange, setDateRange] = useState<
    { from: Date; to: Date } | undefined
  >();
  const [totals, setTotals] = useState<Totals | null>(null);
  useEffect(() => {
    if (dateRange) {
      console.log("Selected date range:", dateRange);
      // Call the getTotalsByRange function with the selected date range
      getTotalsByRange(dateRange.from.toISOString(), dateRange.to.toISOString())
        .then((totals) => {
          console.log("Totals for the selected range:", totals);
          setTotals(totals);
        })
        .catch((error) => {
          console.error("Error fetching totals:", error);
        });
    }
  }, [dateRange]);

  return (
    <div className='p-4 flex flex-row items-start mx-6'>
      <div>
        <h1 className='text-2xl font-bold mb-4'>Report</h1>
        <Calendar
          mode='range'
          selected={dateRange}
          onSelect={setDateRange}
          captionLayout='dropdown-buttons'
        />
      </div>
      <div>
        {dateRange && (
          <div className='mt-4'>
            {/* <p>Selected Range:</p>
            <p>From: {formatDate(dateRange.from)}</p>
            <p>To: {formatDate(dateRange.to)}</p> */}
            <ReportTable totals={totals} dateRange={dateRange} />
          </div>
        )}
      </div>
    </div>
  );
}
