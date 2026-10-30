"use client";
import {getTotalsByQuarter} from "@/actions/totals"
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from "@/components/ui/select";
import Quarter from "./quarter";

export default function QuarterPage() {
    
    const handleChange = async (year:number) => {
        const res = await getTotalsByQuarter(year);
        return res;
    }
    return (
        <Quarter />
    )
}