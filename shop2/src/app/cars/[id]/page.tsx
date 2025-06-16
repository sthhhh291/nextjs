import {
  get_car,
  get_car_customer,
  get_car_estimates,
  get_car_repairs,
  get_car_phones,
} from "@/lib/api/cars";
// import Card from "@/lib/components/Card";
import Heading from "@/lib/components/Heading";
import CardList from "@/lib/components/CardList";

type carProps = {
  id: number;
};

type customer = {
  id: number;
  first_name: string;
  last_name: string;
  notes: string;
};

type car = {
  id: number;
  year: string;
  make: string;
  model: string;
  notes: string;
};

type phone = {
  id: number;
  phone_number: string;
  phone_type: string;
};

type estimate = {
  id: number;
  date: string;
  miles: number;
  hours_taken: number;
  pub_notes: string;
};

const CarPage = async ({ params }: { params: carProps }) => {
  const { id } = await params;
  const car_data = await get_car(id);
  const car: car = car_data.car;
  const customer: customer = await get_car_customer(id);
  const phones: phone[] = await get_car_phones(id);
  const estimates: estimate[] = await get_car_estimates(id);
  const repairs: estimate[] = await get_car_repairs(id);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-8">
      <h1 className="text-2xl font-bold mb-4">car Details</h1>
      <p className="text-lg">car ID: {id}</p>
      <Heading title={`${customer.first_name} ${customer.last_name}`} />
      <Heading title={`${car.year} ${car.make} ${car.model}`} />
      <h2 className="text-xl font-semibold mt-6 mb-4">Phones</h2>
      <CardList
        items={phones.map((phone) => ({
          id: phone.id,
          title: `${phone.phone_type} - ${phone.phone_number}`,
          description: ``,
        }))}
      />
      <h2 className="text-xl font-semibold mt-6 mb-4">Estimates</h2>
      <CardList
        items={estimates.map((estimate) => ({
          id: estimate.id,
          title: `${estimate.date} ${estimate.miles} ${estimate.hours_taken}`,
          description: estimate.pub_notes,
          href: `/estimates/${estimate.id}`,
        }))}
      />
      <h2 className="text-xl font-semibold mt-6 mb-4">Repairs</h2>
      <CardList
        items={repairs.map((estimate) => ({
          id: estimate.id,
          title: `${estimate.date} ${estimate.miles} ${estimate.hours_taken}`,
          description: estimate.pub_notes,
          href: `/repairs/${estimate.id}`,
        }))}
      />
    </div>
  );
};
export default CarPage;
