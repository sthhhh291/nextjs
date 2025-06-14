"use client";

import { get_customers } from "../api/customers";
import CardList from "./CardList";
import Pagination from "./Pagination";
import { useState, useEffect } from "react";

type customer = {
  id: number;
  first_name: string;
  last_name: string;
  notes: string;
};

type totalProps = {
  total: number;
  per_page: number;
  page: number;
  next_page: number;
  prev_page: number;
  pages: number;
};

const CustomerSearch = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [customers, setCustomers] = useState<customer[]>([]);
  const [page, setPage] = useState(1);
  const [totals, setTotals] = useState<totalProps>({
    total: 110,
    per_page: 20,
    page: page,
    next_page: 2,
    prev_page: 1,
    pages: 5,
  });

  useEffect(() => {
    const fetchData = async () => {
      const data = await get_customers(searchTerm, page, 20);
      setCustomers(data.customers);
      console.log("totals", data.totals);
      setTotals(data.totals);
    };
    fetchData();
  }, [searchTerm, page]);

  const handlePageChange = (newPage: number) => {
    setPage(newPage);
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
    setPage(1); // Reset to first page on new search
  };

  return (
    <>
      <input
        className='full-width'
        type='text'
        placeholder='Search customers...'
        value={searchTerm}
        onChange={handleSearchChange}
      />
      <CardList
        items={customers.map((customer) => ({
          id: customer.id,
          title: `${customer.first_name} ${customer.last_name}`,
          description: customer.notes,
        }))}
      />
      <div>{totals.total}</div>
      <Pagination
        total={totals.total}
        per_page={totals.per_page}
        page={totals.page}
        next_page={totals.next_page}
        prev_page={totals.prev_page}
        pages={totals.pages}
        onPageChange={handlePageChange}
      />
    </>
  );
};

export default CustomerSearch;
