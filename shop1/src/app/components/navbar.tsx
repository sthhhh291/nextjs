import Link from "next/link"


export default function Navbar () {
    return (
    <div className="border-collapse p-3 m-3 bg-slate-600 rounded-md">
        <Link className="border border-spacing-2 border-slate-950 cursor-pointer rounded-lg p-3 m-3 text-2xl" href={`/`}>Chuck&apos;s Car Care</Link>
        <Link className="border border-spacing-2 border-slate-950 cursor-pointer rounded-lg p-3 m-3 text-2xl"href={`/customers`}>Customers</Link>
        <Link className="border border-spacing-2 border-slate-950 cursor-pointer rounded-lg p-3 m-3 text-2xl"href={`/`}>Cars</Link>
        <Link className="border border-spacing-2 border-slate-950 cursor-pointer rounded-lg p-3 m-3 text-2xl"href={`/`}>Estimates</Link>
        <Link className="border border-spacing-2 border-slate-950 cursor-pointer rounded-lg p-3 m-3 text-2xl"href={`/`}>Reports</Link>
        <Link className="border border-spacing-2 border-slate-950 cursor-pointer rounded-lg p-3 m-3 text-2xl"href={`/`}>Income</Link>
    </div>
    )
}