"use client";
import { saveAdmin, deleteAdmin } from "@/actions/admin";
import { useActionState } from "react";
import type { Admin } from "@/types";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { FieldSet, Field } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import CustomerComboBox from "./customer-combobox";
import { Card } from "@/components/ui/card";
import { Trash } from "lucide-react";
export default function AdminForm(params: { admin: Admin | null }) {
  const data = params.admin;
  const [state, formAction, isPending] = useActionState(saveAdmin, {
    error: null,
    success: false,
    admin: null,
  });
  const [tax_rate, settax_rate] = useState(data?.tax_rate || "");
  const [salary, setSalary] = useState(data?.salary || "");

  const buttonAction = data ? "Save Changes" : "Create Admin";

  async function handleDelete(id: number) {
    const conf = confirm("Are you sure you want to delete admin?");
    if (conf) {
      await deleteAdmin(id);
    }
  }

  // useEffect(() => {
  //   if (!isPending && state.success) {
  //     setOpen(false);
  //   }
  // }, [isPending, state.success]);

  return (
    <Card>
      <form
        action={formAction}
        className='grid grid-cols-1 gap-6 sm:grid-cols-4 px-4 mx-4'>
        {data && <input type='hidden' name='id' value={data.id} />}
        <FieldSet className='col-span-full grid grid-cols-1 gap-6 sm:grid-cols-5'>
          <Field>
            <Label htmlFor='Customer'>Pick a Person</Label>
          </Field>
          <Field>
            <Label htmlFor='title'>Title</Label>
            <Input
              type='text'
              name='title'
              placeholder='title...'
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </Field>
          <Field>
            <Label htmlFor='salary'>Salary</Label>
            <Input
              type='text'
              name='salary'
              placeholder='model...'
              value={salary}
              onChange={(e) => setSalary(e.target.value)}
            />
          </Field>
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
