import { logout } from "@/actions/auth";
import DarkModeComponent from "@/app/(loggedin)/ui/dark-mode";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { cookies } from "next/headers";

export default async function Navbar() {
  const cookieStore = await cookies();
  const username = cookieStore.get("username")?.value;
  const isAdmin = cookieStore.get("is_admin")?.value === "true";

  const protected_links = [
    { href: "/", label: "Home" },
    { href: "/customers", label: "Customers" },
    { href: "/cars", label: "Cars" },
    { href: "/estimates", label: "Estimates" },
    { href: "/parts-order", label: "Parts Order" },
  ];

  const admin_links = [
    { href: "/users", label: "Users" },
    { href: "/admin", label: "Admin" },
    { href: "/income", label: "Income" },
    { href: "/employees", label: "Employees" },
    { href: "/markups", label: "Markup" },
  ];
  return (
    <nav className='sticky top-0 z-40 border-b bg-card text-card-foreground'>
      <div className='mx-auto flex max-w-7xl flex-wrap items-center gap-x-5 gap-y-2 px-4 py-3 sm:px-6 lg:px-8'>
        <ul className='flex flex-wrap items-center gap-1'>
          {protected_links.map((link) => (
            <li key={link.href}>
              <Link
                href={link.href}
                className='block rounded-md px-2.5 py-1.5 text-sm text-muted-foreground transition-colors hover:bg-accent hover:text-accent-foreground'>
                {link.label}
              </Link>
            </li>
          ))}
          {isAdmin &&
            admin_links.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className='block rounded-md px-2.5 py-1.5 text-sm text-muted-foreground transition-colors hover:bg-accent hover:text-accent-foreground'>
                  {link.label}
                </Link>
              </li>
            ))}
          <li>
            <form action={logout}>
              <Button
                type='submit'
                variant='ghost'
                size='sm'
                className='text-muted-foreground'>
                Sign out
              </Button>
            </form>
          </li>
        </ul>
        <div className='ml-auto flex items-center gap-3'>
          <DarkModeComponent />
          {username && <span className='text-sm font-medium'>{username}</span>}
        </div>
      </div>
    </nav>
  );
}
