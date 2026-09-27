import { getEstimateById, getSubsByEstimateId } from "@/actions/estimate";
import { getCarById } from "@/actions/car";
import { getLaborPartsOilBySubId } from "@/actions/sub-estimate";
import type { Estimate, Car, Customer, Sub_estimate, Phone, Email, Address } from "@/types";
import EstimateDetail from "@/app/(loggedin)/ui/estimate-detail";
import CarDetail from "@/app/(loggedin)/ui/car-detail";
import { getCustomerAddresses, getCustomerById, getCustomerEmails, getCustomerPhones } from "@/actions/customer";
import CustomerDetail from "../../ui/customer-detail";
import SubEstimateCard from "../../ui/sub-estimate-card";

export default async function CarPage({ params }: { params: { id: string } }) {
  const estimateId = Number((await params).id);
  const estimatePromise: Promise<Estimate> = getEstimateById(estimateId);
  const subsPromise: Promise<Sub_estimate[]> = getSubsByEstimateId(estimateId);
  const [estimate,subs] = await Promise.all([
    estimatePromise,
    subsPromise
  ])
  const car: Car = await getCarById(estimate.car_id);
  const customer: Customer = await getCustomerById(car.customer_id);
  const phonesPromise: Promise<Phone[]> = getCustomerPhones(customer.id);
  const emailsPromise: Promise<Email[]> = getCustomerEmails(customer.id);
  const addressesPromise: Promise<Address[]> = getCustomerAddresses(customer.id);
  const [phones,emails,addresses] = await Promise.all([phonesPromise,emailsPromise,addressesPromise])
  for (const sub of subs) {
    const temp = await getLaborPartsOilBySubId(sub.id);
    sub.labor = temp.labor;
    sub.parts = temp.parts;
    sub.oil = temp.oil;
    sub.totals = temp.totals;
  }
  //   const estimates: Estimate[] = await getEstimatesByEstimateId(estimateId);
  //   let phones: Phone[] = [];
  //   let emails: Email[] = [];
  //   let addresses: Address[] = [];

  return (
    <>
      <h2 className='text-xl font-bold bg-center align-center text-center p-4 rounded-lg shadow-md mt-4'>
        Estimate Details
      </h2>
      <div className='grid grid-cols-2 gap-4 align-center text-center p-4 rounded-lg shadow-md mt-4'>
        <CustomerDetail
          customer={customer}
          phones={phones}
          addresses={addresses}
          emails={emails}
        />
        <CarDetail car={car} />
        <EstimateDetail estimate={estimate} />
        {subs.map((sub) => (
          <SubEstimateCard key={sub.id} sub={sub} />
        ))}
      </div>
    </>
  );
}
