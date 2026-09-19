"use client";

import {
  Combobox,
  ComboboxContent,
  ComboboxEmpty,
  ComboboxInput,
  ComboboxItem,
  ComboboxList,
} from "@/components/ui/combobox";

import { getCustomers } from "@/actions/customer";
import { useEffect, useRef, useState } from "react";
import type { Customer } from "@/types";

export default function CustomerComboBox({
  name = "customer_id",
  defaultCustomer = null,
}: {
  name?: string;
  defaultCustomer?: Customer | null;
}) {
  const [customers, setCustomers] = useState<Customer[]>(
    defaultCustomer ? [defaultCustomer] : [],
  );
  const requestId = useRef(0);
  const searchTimeout = useRef<number | undefined>(undefined);

  useEffect(() => {
    const timeoutId = window.setTimeout(async () => {
      const currentRequestId = ++requestId.current;

      try {
        const data = await getCustomers(1, 30, "");
        if (currentRequestId === requestId.current) {
          setCustomers(
            (
              defaultCustomer &&
                !data.items.some(
                  (customer: Customer) => customer.id === defaultCustomer.id,
                )
            ) ?
              [defaultCustomer, ...data.items]
            : data.items,
          );
        }
      } catch (error) {
        console.error("Error fetching customers:", error);
      }
    }, 0);

    return () => {
      window.clearTimeout(timeoutId);
      window.clearTimeout(searchTimeout.current);
    };
  }, []);

  const handleCustomerSearch = (searchTerm: string) => {
    window.clearTimeout(searchTimeout.current);
    searchTimeout.current = window.setTimeout(async () => {
      const currentRequestId = ++requestId.current;

      try {
        const data = await getCustomers(1, 30, searchTerm);
        if (currentRequestId === requestId.current) {
          setCustomers(
            (
              defaultCustomer &&
                !data.items.some(
                  (customer: Customer) => customer.id === defaultCustomer.id,
                )
            ) ?
              [defaultCustomer, ...data.items]
            : data.items,
          );
        }
      } catch (error) {
        console.error("Error fetching customers:", error);
      }
    }, 250);
  };

  return (
    <Combobox<Customer>
      items={customers}
      name={name}
      defaultValue={defaultCustomer}
      itemToStringLabel={(customer) =>
        `${customer.first_name} ${customer.last_name}`
      }
      itemToStringValue={(customer) => String(customer.id)}
      isItemEqualToValue={(item, value) => item.id === value.id}
      onInputValueChange={handleCustomerSearch}>
      <ComboboxInput placeholder='Search customers...' />
      <ComboboxContent>
        <ComboboxEmpty>No items found.</ComboboxEmpty>
        <ComboboxList>
          {(item) => (
            <ComboboxItem key={item.id} value={item}>
              {item.first_name} {item.last_name}
            </ComboboxItem>
          )}
        </ComboboxList>
      </ComboboxContent>
    </Combobox>
  );
}
