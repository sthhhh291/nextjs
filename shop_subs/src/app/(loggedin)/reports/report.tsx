'use client';

import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { useState, useEffect } from "react";
import { getTotalsByRange } from "@/actions/totals";
import type { Totals } from "@/types";
import { formatDate, formatCurrency } from "@/lib/utils"
export default function Report() {
    const [dateRange, setDateRange] = useState<{ from: Date; to: Date } | undefined>();
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
        <div className='p-4 flex flex-row items-start'>
            <div>

            <h1 className='text-2xl font-bold mb-4'>Report</h1>
            <Calendar 
                mode="range" 
                selected={dateRange} 
                onSelect={setDateRange}
                captionLayout="dropdown-buttons" 
            />
            </div>
            <div>

            {dateRange && (
                <div className='mt-4'>
                    <p>Selected Range:</p>
                    <p>From: {formatDate(dateRange.from)}</p>
                    <p>To: {formatDate(dateRange.to)}</p>
                    <div className='mt-2'>
                        Labor Total: {formatCurrency(totals?.labor_total ?? 0)}</div>
                    <div className='mt-2'>
                        Parts Total: {formatCurrency(totals?.parts_total ?? 0)}</div>   
                    <div className='mt-2'>
                        Oil Total: {formatCurrency(totals?.oil_total ?? 0)}</div>   
                    <div className='mt-2'>
                        Sub Total: {formatCurrency((totals?.sub_total ?? 0))}</div>
                    <div className='mt-2'>
                        Tax: {formatCurrency((totals?.tax ?? 0))}</div>
                    <div className='mt-2'>
                        Shop Fees: {formatCurrency((totals?.shop_fees ?? 0))}</div>
                    <div className='mt-2'>
                        Total: {formatCurrency((totals?.grand_total ?? 0))}</div>
                </div>
            )}
            </div>
        </div>
    );
}