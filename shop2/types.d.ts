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
};

type car = base & carCreate;

type phoneCreate = {
  customer_id: number;
  phone_type: string;
  phone_number: string;
};

type phone = phoneCreate & base;
