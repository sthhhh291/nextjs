"use client";
import React, { useState, FormEvent } from "react";
import Button from "../Button";
type Customer = {
  first_name: string;
  last_name: string;
  notes: string;
};

type CustomerFormProps = {
  initialValues?: Customer;
  onSubmit: (customer: Customer) => void;
  submitLabel?: string;
};

export default function CustomerForm({
  initialValues = { first_name: "", last_name: "", notes: "" },
  onSubmit,
  submitLabel = "Save",
}: CustomerFormProps) {
  const [form, setForm] = useState<Customer>(initialValues);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    onSubmit(form);
  };

  return (
    <form onSubmit={handleSubmit} style={{ maxWidth: 400 }}>
      <div>
        <label>
          First Name
          <input
            name="first_name"
            value={form.first_name}
            onChange={handleChange}
            type="text"
            required
          />
        </label>
      </div>
      <div>
        <label>
          Last Name
          <input
            name="last_name"
            value={form.last_name}
            onChange={handleChange}
            type="text"
            required
          />
        </label>
      </div>
      <div>
        <label>
          Notes
          <input
            name="notes"
            value={form.notes}
            onChange={handleChange}
            type="text"
          />
        </label>
      </div>
      <div style={{ marginTop: 16 }}>
        <Button type="submit">{submitLabel}</Button>
      </div>
    </form>
  );
}
