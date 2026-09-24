import { getUsers } from "@/actions/users";
import type { User } from "@/types";
import UsersForm from "../ui/users-form";
import { Button } from "@/components/ui/button";
import { Trash } from "lucide-react";

export default async function UserssPage() {
  const users: User[] = await getUsers();
  return (
    <>
      {/* create form here */}
      <h2>Add a user here</h2>
      <UsersForm user={null} />
      {/* array of edit forms here */}
      <h2>View/Edit existing users here</h2>
      {users.map((emp) => (
        <div key={emp.id}>
          <UsersForm user={emp} />
          {/* <Button>
            <Trash />
          </Button> */}
        </div>
      ))}
    </>
  );
}
