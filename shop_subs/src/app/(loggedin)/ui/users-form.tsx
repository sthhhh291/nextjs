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
import { Checkbox } from "@/components/ui/checkbox";
export default function UserForm(params: { user: User | null }) {
  const data = params.user;
  const [state, formAction, isPending] = useActionState(saveUser, {
    error: null,
    success: false,
    markup: null,
  });
  const [username, setUsername] = useState(data?.username || "");
  const [password, setPassword] = useState("");
  const [is_admin, setIsAdmin] = useState(Boolean(data?.is_admin));
  const [is_active, setIsActive] = useState(Boolean(data?.is_active ?? true));

  const buttonAction = data ? "Save Changes" : "Create User";

  async function handleDelete(id: number) {
    const conf = confirm("Are you sure you want to delete users?");
    if (conf) {
      await deleteUser(id);
    }
  }

  return (
    <Card>
      <form action={formAction} className='p-4 sm:p-5'>
        {data && <input type='hidden' name='id' value={data.id} />}
        <FieldSet className='grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-5'>
          <Field>
            <Label htmlFor='username'>Username</Label>
            <Input
              type='text'
              name='username'
              placeholder='Username...'
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </Field>
          {!data && (
            <Field>
              <Label htmlFor='password'>password</Label>
              <Input
                type='password'
                name='password'
                placeholder='Password...'
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </Field>
          )}
          <Field className='w-fit shrink-0'>
            <Label htmlFor='is_admin'>Admin User?</Label>
            <Checkbox
              name='is_admin'
              checked={is_admin}
              onCheckedChange={(next) => setIsAdmin(Boolean(next))}
              value={String(is_admin)}
            />
            {/* <Input
              type='text'
              name='is_admin'
              placeholder='Admin?...'
              value={is_admin}
              onChange={(e) => setIsAdmin(e.target.value)}
            /> */}
          </Field>
          <Field className='w-fit shrink-0'>
            <Label htmlFor='is_active' className='w-fit'>
              Active User?
            </Label>
            <Checkbox
              name='is_active'
              checked={is_active}
              onCheckedChange={(next) => setIsActive(Boolean(next))}
              value={String(is_active)}
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
          {state.error && (
            <p role='alert' className='col-span-full text-sm text-destructive'>
              {state.error}
            </p>
          )}
          {data && (
            <Field>
              <Label className='invisible'>Delete</Label>
              <Button
                type='button'
                variant='destructive'
                size='icon'
                aria-label='Delete user'
                title='Delete user'
                onClick={() => handleDelete(data.id)}>
                <Trash />
              </Button>
            </Field>
          )}
        </FieldSet>
      </form>
    </Card>
  );
}
