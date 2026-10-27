import Link from "next/link";

export default async function Navbar() {

  const links = [
    { href: "/reports/", label: "Custom" },
    { href: "/reports/quarter", label: "Quarter" },
    { href: "/reports/week", label: "Week" },
    { href: "/reports/month", label: "Month" },
    { href: "/reports/year", label: "Year" },
    { href: "/reports/all", label: "All results" },
  ];
  return (
    <nav className='sticky top-0 z-40 border-b bg-card text-card-foreground'>
      <div className='mx-auto flex max-w-7xl flex-wrap items-center gap-x-5 gap-y-2 px-4 py-3 sm:px-6 lg:px-8'>
        <ul className='flex flex-wrap items-center gap-1'>
          {links.map((link) => (
            <li key={link.href}>
              <Link
                href={link.href}
                className='block rounded-md px-2.5 py-1.5 text-sm text-muted-foreground transition-colors hover:bg-accent hover:text-accent-foreground'>
                {link.label}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </nav>
  );
}
