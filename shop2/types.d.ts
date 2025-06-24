type base = {
  id: number;
};

type customerCreate = {
  first_name: string;
  last_name: string;
  notes: string;
};

type customer = base & customerCreate;
