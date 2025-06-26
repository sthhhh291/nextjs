"use client";
import Input from "./Input";
import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";

export default function SearchCustomers({ query }: { query?: string }) {
  const router = useRouter();
  const [filter, setFilter] = useState(query);
  const initialRender = useRef(true);
  useEffect(() => {
    if (initialRender.current) {
      initialRender.current = false;
      return;
    }
    if (filter !== undefined) {
      router.push(`/customers?filter=${filter}`);
    } else {
      // do i need anyghint here? don't seem to
    }
  }, [filter, router]);
  return (
    <>
      <Input
        placeholder="Search Customers"
        onChange={(e) => setFilter(e.target.value)}
        value={filter}
      />
    </>
  );
}
