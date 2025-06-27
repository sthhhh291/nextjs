"use server";
import Input from "@/lib/components/Input";
import Button from "@/lib/components/Button";

export default async function AddCustomer() {
  "use server";
  const formAction = () => {
    console.log("form action");
  };
  return (
    <form action={formAction}>
      <Input label='First Name' placeholder='First Name' />
      <Input label='Last Name' placeholder='Last Name' />
      <Input label='Notes' placeholder='Notes' />
      <Button>Add Customer</Button>
    </form>
  );
}
