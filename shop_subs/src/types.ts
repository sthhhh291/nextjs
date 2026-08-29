export type Customer = {
  id: number;
  first_name: string;
  last_name: string;
  notes: string;
};

export type Phone = {
  id: number;
  customer_id: number;
  number: string;
  type: string;
};

export type Email = {
  id: number;
  customer_id: number;
  address: string;
  type: string;
};

export type Address = {
  id: number;
  customer_id: number;
  street: string;
  city: string;
  state: string;
  zip_code: string;
};

export type Car = {
  id: number;
  customer_id: number;
  year: number;
  make: string;
  car_model: string;
  engine: string;
  vin: string;
  license: string;
  fleet_number: string;
  color: string;
  notes: string;
};

export type CarCustomer = Customer & Car;

export type Estimate = {
  id: number;
  car_id: number;
  employee_id: number;
  date: string;
  hours: number;
  mileage: number;
  estimate_type: string;
};

export type Sub_estimate = {
  id: number;
  estimate_id: number;
  description: string;
};

export type Labor = {
  id: number;
  sub_estimate_id: number;
  description: string;
  hours: number;
  rate: number;
  price: number;
};

export type Part = {
  // works on oil too
  id: number;
  sub_estimate_id: number;
  manufacturer: string;
  part_number: string;
  description: string;
  quantity: number;
  cost: number;
  list: number;
  price: number;
};

export type Totals = {
  estimate_id: number;
  sub_estimate_id: number;
  employee_id: number;
  date: string;
  labor_total: number;
  parts_total: number;
  oil_total: number;
  sub_total: number;
  tax: number;
  shop_fees: number;
  grand_total: number;
  cost_total: number;
  parts_margin: number;
  margin: number;
};

export type Income = {
  id: number;
  description: string;
  payee: string;
  date: string;
  payment_type: string;
  amount: 0;
};

export type PartsOrder = {
  // id: number;
  description: string;
  payee: string;
  date: string;
  payment_type: string;
  amount: number;
};

export type Employee = {
  id: number;
  customer_id: number;
  first_name: string;
  last_name: string;
  title: string;
  salary: number;
};

export type User = {
  id: number;
  username: string;
  is_admin: boolean;
  is_active: boolean;
};

export type Admin = {
  id: number;
  tax_rate: number;
  labor_rate: number;
  shop_fees_percent: number;
  shop_fees_limit: number;
};

export type Markup = {
  id: number;
  amount: number;
  markup_factor: number;
};
