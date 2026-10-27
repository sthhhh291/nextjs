"use client";
import {getTotalsByQuarter} from "@/actions/totals"
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from "@/components/ui/select";

export default function QuarterPage() {
    const years = Array.from({length: new Date().getFullYear() - 2004 + 1}, (_,i) => i + 2004 );
    const items = years.map(item => {
        return { label: item, value: item };
    })
    const handleChange = async (year:number) => {
        const res = await getTotalsByQuarter(year);
        return res;
    }
    return (
        <div>
            <Select items={items} onValueChange={() => handleChange}>
                <SelectTrigger className="w-full max-w-48">
                    <SelectValue />
                </SelectTrigger>
                <SelectContent>
                    <SelectGroup>
                    <SelectLabel>Years</SelectLabel>
                    {items.map((item) => (
                        <SelectItem key={item.value} value={item.value}>
                        {item.label}
                        </SelectItem>
                    ))}
                    </SelectGroup>
                </SelectContent>
            </Select>

        </div>
    )
}