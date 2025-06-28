// "use server";
import Input from "@/lib/components/Input";
import Button from "@/lib/components/Button";
import { addCustomer } from "@/lib/actions";

export default async function CustomerForm({customer}:{customer?:customerCreate}) {
  return (
    customer ? (
      <p>edit here</p>
    ) : (
      <form action={addCustomer}>
        <Input label="First Name" placeholder="First Name" name="first_name" />
        <Input label="Last Name" placeholder="Last Name" name="last_name" />
        <Input label="Notes" placeholder="Notes" name="notes" />
        <Button>Add Customer</Button>
      </form>
    )
  );
}
