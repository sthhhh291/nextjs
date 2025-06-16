"use client";

import { get_cars } from "../api/cars";
import Input from "./Input";
import SearchList from "./SearchList";
import Pagination from "./Pagination";
import { useState, useEffect } from "react";

type car = {
  id: number;
  first_name: string;
  last_name: string;
  year: string;
  make: string;
  model: string;
  engine: string;
  vin: string;
  license: string;
  fleet_no: string;
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

const CarSearch = () => {
  const [customerSearch, setCustomerSearch] = useState("");
  const [carSearch, setCarSearch] = useState("");
  const [cars, setcars] = useState<car[]>([]);
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
      const data = await get_cars(customerSearch, carSearch, page, 20);
      setcars(data.cars);
      setTotals(data.totals);
    };
    fetchData();
  }, [customerSearch, carSearch, page]);

  const handlePageChange = (newPage: number) => {
    setPage(newPage);
  };

  const handleCustomerSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCustomerSearch(e.target.value);
    setPage(1); // Reset to first page on new search
  };

  const handleCarSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCarSearch(e.target.value);
    setPage(1); // Reset to first page on new search
  };

  return (
    <div className="flex flex-col items-center min-h-screen p-8">
      <Input
        type="text"
        placeholder="Search customers..."
        value={customerSearch}
        onChange={handleCustomerSearch}
      />
      <Input
        type="text"
        placeholder="Search cars..."
        value={carSearch}
        onChange={handleCarSearch}
      />
      <Pagination
        total={totals.total}
        per_page={totals.per_page}
        page={totals.page}
        next_page={totals.next_page}
        prev_page={totals.prev_page}
        pages={totals.pages}
        onPageChange={handlePageChange}
      />
      <SearchList
        items={cars.map((car) => ({
          id: car.id,
          title: `${car.first_name} ${car.last_name} - ${car.year} ${car.make} ${car.model}`,
          description: car.notes,
          href: `/cars/${car.id}`,
        }))}
      />
    </div>
  );
};

export default CarSearch;
