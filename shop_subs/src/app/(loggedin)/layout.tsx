// src/app/(loggedin)/layout.tsx
import Navbar from "../navbar";

export default function LoggedInLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <div className='flex min-h-0 flex-1 flex-col'>
      <Navbar />
      <main className='mx-auto w-full max-w-7xl flex-1 px-4 py-6 sm:px-6 lg:px-8'>
        {children}
      </main>
    </div>
  );
}
