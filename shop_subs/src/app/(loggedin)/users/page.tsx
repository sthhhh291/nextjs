import { getUsers } from "@/actions/users";
import type { User } from "@/types";
import UsersForm from "../ui/users-form";
import { Button } from "@/components/ui/button";
import { Trash } from "lucide-react";

export default async function UserssPage() {
  const orders: User[] = await getUsers();
  return (
    <>
      {/* create form here */}
      <h2>Add a user here</h2>
      <UsersForm order={null} />
      {/* array of edit forms here */}
      <h2>View/Edit existing users here</h2>
      {orders.map((emp) => (
        <div key={emp.id}>
          <UsersForm order={emp} />
          {/* <Button>
            <Trash />
          </Button> */}
        </div>
      ))}
    </>
  );
}
