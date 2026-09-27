import AdminForm from "../ui/admin-form";
import { getadmin } from "@/actions/admin";
export default async function AdminPage() {
  const admin = await getadmin();
  return (
    <section className='mx-auto max-w-4xl space-y-6'>
      <header className='space-y-1'>
        <h1 className='text-2xl font-semibold'>Shop settings</h1>
        <p className='text-sm text-muted-foreground'>
          Configure rates, tax, and shop fees.
        </p>
      </header>
      <AdminForm admin={admin} />
    </section>
  );
}
