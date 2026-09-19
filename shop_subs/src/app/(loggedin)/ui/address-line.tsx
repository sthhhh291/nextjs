"use client";
import AddressForm from "./address-form";
import { Address } from "@/types";
import { deleteAddress } from "@/actions/address";
import { Button } from "@/components/ui/button";
import { Trash } from "lucide-react";

export default function AddressLine(params: { address: Address }) {
  const address = params.address;
  const customer_id = address.customer_id as number;
  const deleteAddressHandler = async (id: number) => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this address number?",
    );
    if (confirmed) {
      try {
        await deleteAddress(id, customer_id);
      } catch (error) {
        console.error("Error deleting address:", error);
      }
    }
  };

  return (
    <div className='flex flex-wrap  justify-center'>
      <p>
        {address.street}, {address.city} {address.state} {address.zip_code}
      </p>
      <AddressForm address={address} customer_id={customer_id} />
      <Button onClick={() => deleteAddressHandler(address.id)}><Trash /></Button>
    </div>
  );
}
