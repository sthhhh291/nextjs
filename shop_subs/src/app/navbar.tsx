import { logout } from "@/actions/auth";
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
    <nav className='bg-gray-800 text-white p-4'>
      <div className='flex items-center'>
        <ul className='flex space-x-4'>
          {protected_links.map((link) => (
            <li key={link.href}>
              <a href={link.href} className='hover:underline'>
                {link.label}
              </a>
            </li>
          ))}
          {isAdmin && admin_links.map((link) => (
            <li key={link.href}>
              <a href={link.href} className='hover:underline'>
                {link.label}
              </a>
            </li>
          ))}
          <li>
            <form action={logout}>
              <button type='submit' className='hover:underline'>
                Logout
              </button>
            </form>
          </li>
        </ul>
        {username && <span className='ml-auto'>{username}</span>}
      </div>
    </nav>
  );
}
