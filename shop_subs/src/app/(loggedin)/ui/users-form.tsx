"use client";
import { saveUser, deleteUser } from "@/actions/users";
import { useActionState } from "react";
import type { User } from "@/types";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { FieldSet, Field } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

import { Card } from "@/components/ui/card";
import { Trash } from "lucide-react";
export default function UserForm(params: { users: User | null }) {
  const data = params.users;
  const [state, formAction, isPending] = useActionState(saveUser, {
    error: null,
    success: false,
    users: null,
  });
  const [username, setUsername] = useState(data?.username || "");
  const [is_admin, setIsAdmin] = useState(String(data?.is_admin ?? ""));
  const [is_active, setIsActive] = useState(String(data?.is_active ?? ""));

  const buttonAction = data ? "Save Changes" : "Create User";

  async function handleDelete(id: number) {
    const conf = confirm("Are you sure you want to delete users?");
    if (conf) {
      await deleteUser(id);
    }
  }

  return (
    <Card>
      <form
        action={formAction}
        className='grid grid-cols-1 gap-6 sm:grid-cols-4 px-4 mx-4'>
        {data && <input type='hidden' name='id' value={data.id} />}
        <FieldSet className='col-span-full grid grid-cols-1 gap-6 sm:grid-cols-5'>
          <Field>
            <Label htmlFor='username'>username</Label>
            <Input
              type='number'
              name="username"
              placeholder="username..."
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </Field>
          <Field>
            <Label htmlFor='is_admin'>User Factor</Label>
            <Input
              type='text'
              name='is_admin'
              placeholder='Labor Rate...'
              value={is_admin}
              onChange={(e) => setIsAdmin(e.target.value)}
            />
          </Field>
          <Field>
            <Label htmlFor='is_active'>is_active</Label>
            <Input
              type='text'
              name='is_active'
              placeholder='model...'
              value={is_active}
              onChange={(e) => setIsActive(e.target.value)}
            />
          </Field>
          {/* <Field>
            <Label htmlFor='shop_fees_limit'>shop_fees_limit</Label>
            <Input
              type='text'
              name='shop_fees_limit'
              placeholder='Shop fees upper limit...'
              value={shop_fees_limit}
              onChange={(e) => setShopFeesLimit(e.target.value)}
            />
          </Field> */}
          <Field>
            <Label aria-hidden='true' className='invisible'>
              Action
            </Label>
            <Button className='w-full' type='submit' disabled={isPending}>
              {isPending ? "Saving..." : buttonAction}
            </Button>
          </Field>
          {data && (
            <Field>
              <Label className='invisible'>Delete</Label>
              <Button onClick={() => handleDelete(data.id)}>
                <Trash />
              </Button>
            </Field>
          )}
        </FieldSet>
      </form>
    </Card>
  );
}
