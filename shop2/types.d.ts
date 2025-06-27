type base = {
  id: number;
};

type customerCreate = {
  first_name: string;
  last_name: string;
  notes: string;
};

type customer = base & customerCreate;

type carCreate = {
  customer_id: number;
  year: string;
  make: string;
  model: string;
  engine: string;
  vin: string;
  license: string;
  fleet_no: string;
  notes: string;
};

type car = base & carCreate;

type phoneCreate = {
  customer_id: number;
  phone_type: string;
  phone_number: string;
};

type phone = phoneCreate & base;

type estimateCreate = {
  car_id: number;
  employee_id: number;
  date: string;
  miles: number;
  hours_taken: number;
  priv_notes: string;
  pub_notes: string;
};

type estimate = base & estimateCreate;

type laborCreate = {
  estimate_id: number;
  repair_order_id: number;
  description: string;
  hours: number;
  price: number;
};

type labor = base & laborCreate;

type partCreate = {
  estimate_id: number;
  repair_order_id: number;
  description: string;
  mfr_no: string;
  part_no: string;
  quantity: number;
  cost: number;
  list: number;
  price: number;
};

type part = base & partCreate;
