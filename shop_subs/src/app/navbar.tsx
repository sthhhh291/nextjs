
import { logout } from "@/app/actions";

export default function Navbar() {
    const links = [
        { href: "/", label: "Home" },
        { href: "/login", label: "Login" },
        { href: "/register", label: "Register" },
        { href: "/customers", label: "Customers" },
        { href: "/cars", label: "Cars" },
        { href: "/estimates", label: "Estimates" },
        { href: "/users", label: "Users" },
        { href: "/admin", label: "Admin" },
        { href: "/income", label: "Income" },
        { href: "/parts-order", label: "Parts Order" },
    ];
  return (
    <nav className='bg-gray-800 text-white p-4'>
        <ul className='flex space-x-4'>
            {links.map((link) => (
                <li key={link.href}>
                    <a href={link.href} className='hover:underline'>
                        {link.label}
                    </a>
                </li>
            ))}
            <li key="logout">
                <form action={logout}>
                    <button type="submit" className='hover:underline'>
                        Logout
                    </button>
                </form>
            </li>
        </ul>
    </nav>
  )};