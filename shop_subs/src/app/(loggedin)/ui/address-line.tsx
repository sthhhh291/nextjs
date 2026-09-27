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
    <div className='flex flex-wrap items-center justify-between gap-3 px-3 py-2.5 text-sm'>
      <p className='min-w-0 flex-1'>
        {address.street}, {address.city} {address.state} {address.zip_code}
      </p>
      <div className='flex items-center gap-1'>
        <AddressForm address={address} customer_id={customer_id} />
        <Button
          type='button'
          variant='ghost'
          size='icon-sm'
          aria-label='Delete address'
          title='Delete address'
          className='text-destructive hover:bg-destructive/10 hover:text-destructive'
          onClick={() => deleteAddressHandler(address.id)}>
          <Trash aria-hidden='true' />
        </Button>
      </div>
    </div>
  );
}
