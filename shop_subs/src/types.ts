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

export type CarCustomer = Customer & Car