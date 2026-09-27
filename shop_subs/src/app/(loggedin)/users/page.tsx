import { getUsers } from "@/actions/users";
import type { User } from "@/types";
import UsersForm from "../ui/users-form";

export default async function UserssPage() {
  const users: User[] = await getUsers();
  return (
    <section className='mx-auto max-w-5xl space-y-6'>
      <header className='space-y-1'>
        <h1 className='text-2xl font-semibold'>Users</h1>
        <p className='text-sm text-muted-foreground'>
          Manage login access and administrator permissions.
        </p>
      </header>
      <div className='space-y-3'>
        <h2 className='text-base font-semibold'>Add user</h2>
        <UsersForm user={null} />
      </div>
      <div className='space-y-3'>
        <h2 className='text-base font-semibold'>User accounts</h2>
        <div className='grid gap-3'>
          {users.map((user) => (
            <UsersForm key={user.id} user={user} />
          ))}
        </div>
      </div>
    </section>
  );
}
