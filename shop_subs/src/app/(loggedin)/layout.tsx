// src/app/(loggedin)/layout.tsx
import Navbar from "../navbar";

export default function LoggedInLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <>
      <Navbar />
      {children}
    </>
  );
}