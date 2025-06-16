import {
  get_estimate,
  get_estimate_customer,
  get_estimate_phones,
  get_estimate_car,
  get_estimate_labor,
  get_estimate_parts,
  get_estimate_oil,
  get_estimate_totals,
} from "@/lib/api/estimates";
// import estimated from "@/lib/components/estimated";
import Heading from "@/lib/components/Heading";
import CardList from "@/lib/components/CardList";
import Card from "@/lib/components/Card";

type estimateProps = {
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

type labor = {
  id: number;
  description: string;
  hours: number;
  price: number;
};
type part = {
  id: number;
  description: string;
  quantity: number;
  cost: number;
  list: number;
  price: number;
};

type total = {
  labor: number;
  parts: number;
  oil: number;
  subtotal: number;
  tax: number;
  shop_fees: number;
  total: number;
  cost: number;
  margin: number;
  parts_margin: number;
};

const estimatePage = async ({ params }: { params: estimateProps }) => {
  const { id } = await params;
  const estimate: estimate = await get_estimate(id);
  // const estimate: estimate = estimate_data.estimate;
  const customer: customer = await get_estimate_customer(id);
  const car: car = await get_estimate_car(id);
  const phones: phone[] = await get_estimate_phones(id);
  const labor: labor[] = await get_estimate_labor(id);
  const parts: part[] = await get_estimate_parts(id);
  const oil: part[] = await get_estimate_oil(id);
  const totals: total = await get_estimate_totals(id);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-8">
      <h1 className="text-2xl font-bold mb-4">Estimate Details</h1>
      <p className="text-lg">estimate ID: {id}</p>
      <Heading title={`${customer.first_name} ${customer.last_name}`} />
      <Heading title={`${car.year} ${car.make} ${car.model}`} />
      <Heading title={`${estimate.date}`} />
      <h2 className="text-xl font-semibold mt-6 mb-4">Phones</h2>
      <CardList
        items={phones.map((phone) => ({
          id: phone.id,
          title: `${phone.phone_type} - ${phone.phone_number}`,
          description: ``,
        }))}
      />
      <h2 className="text-xl font-semibold mt-6 mb-4">Labor</h2>
      <CardList
        items={labor.map((estimate) => ({
          id: estimate.id,
          title: `${estimate.description} ${estimate.hours} ${estimate.price}`,
          description: "",
          href: `/estimates/${estimate.id}`,
        }))}
      />
      <h2 className="text-xl font-semibold mt-6 mb-4">Parts</h2>
      <CardList
        items={parts.map((estimate) => ({
          id: estimate.id,
          title: `${estimate.description} ${estimate.quantity} ${estimate.price}`,
          description: "",
          href: `/repairs/${estimate.id}`,
        }))}
      />
      <h2 className="text-xl font-semibold mt-6 mb-4">Oil</h2>
      <CardList
        items={oil.map((estimate) => ({
          id: estimate.id,
          title: `${estimate.description} ${estimate.quantity} ${estimate.price}`,
          description: "",
          href: `/repairs/${estimate.id}`,
        }))}
      />
      <h2 className="text-xl font-semibold mt-6 mb-4">Totals</h2>
      <Card
        title={`${totals.subtotal} ${totals.tax} ${totals.shop_fees} ${totals.total}`}
        description=""
      />
    </div>
  );
};
export default estimatePage;
