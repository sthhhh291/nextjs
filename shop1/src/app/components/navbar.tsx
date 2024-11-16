"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"


export default function Navbar () {
    const path = usePathname();
    return (
    <div className="border-collapse p-3 m-3 bg-slate-600 rounded-md">
        <Link className={`link ${path === '/' 
            ? 'border-spacing-2 cursor-pointer rounded-lg p-3 m-3 text-2xl bg-slate-950' 
            : 'border-spacing-2 cursor-pointer rounded-lg p-3 m-3 text-2xl hover:bg-slate-950'}`}  href={`/`}>
            Chuck&apos;s Car Care</Link>
        <Link className={`link ${path === '/customers' 
            ? 'border-spacing-2 cursor-pointer rounded-lg p-3 m-3 text-2xl bg-slate-950' 
            : 'border-spacing-2 cursor-pointer rounded-lg p-3 m-3 text-2xl hover:bg-slate-950'}`} href={`/customers`}>
            Customers
            </Link>
        <Link className={`link ${path === '/cars' 
            ? 'border-spacing-2 cursor-pointer rounded-lg p-3 m-3 text-2xl bg-slate-950' 
            : 'border-spacing-2 cursor-pointer rounded-lg p-3 m-3 text-2xl hover:bg-slate-950'}`} href={`/cars`}>Cars</Link>
        <Link className={`link ${path === '/estimates' 
            ? 'border-spacing-2 cursor-pointer rounded-lg p-3 m-3 text-2xl bg-slate-950' 
            : 'border-spacing-2 cursor-pointer rounded-lg p-3 m-3 text-2xl hover:bg-slate-950'}`} href={`/estimates`}>Estimates</Link>
        <Link className={`link ${path === '/reports' 
            ? 'border-spacing-2 cursor-pointer rounded-lg p-3 m-3 text-2xl bg-slate-950' 
            : 'border-spacing-2 cursor-pointer rounded-lg p-3 m-3 text-2xl hover:bg-slate-950'}`} href={`/reports`}>Reports</Link>
        <Link className={`link ${path === '/income' 
            ? 'border-spacing-2 cursor-pointer rounded-lg p-3 m-3 text-2xl bg-slate-950' 
            : 'border-spacing-2 cursor-pointer rounded-lg p-3 m-3 text-2xl hover:bg-slate-950'}`} href={`/income`}>Income</Link>
    </div>
    )
}