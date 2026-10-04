import {
  getEstimateById,
  getSubsByEstimateId,
  getTotalsById,
} from "@/actions/estimate";
import { getCarById } from "@/actions/car";
import { getLaborPartsOilBySubId } from "@/actions/sub-estimate";
import type {
  Estimate,
  Car,
  Customer,
  Sub_estimate,
  Phone,
  Email,
  Address,
  Totals,
} from "@/types";
import EstimateDetail from "@/app/(loggedin)/ui/estimate-detail";
import CarDetail from "@/app/(loggedin)/ui/car-detail";
import {
  getCustomerAddresses,
  getCustomerById,
  getCustomerEmails,
  getCustomerPhones,
} from "@/actions/customer";
import CustomerDetail from "../../ui/customer-detail";
import SubEstimateCard from "../../ui/sub-estimate-card";
import PrintEstimateButton from "../../ui/print-estimate-button";

export default async function CarPage({ params }: { params: { id: string } }) {
  const estimateId = Number((await params).id);
  const estimatePromise: Promise<Estimate> = getEstimateById(estimateId);
  const subsPromise: Promise<Sub_estimate[]> = getSubsByEstimateId(estimateId);
  const totalsPromise: Promise<Totals> = getTotalsById(estimateId);
  const [estimate, subs, totals] = await Promise.all([
    estimatePromise,
    subsPromise,
    totalsPromise,
  ]);
  const car: Car = await getCarById(estimate.car_id);
  const customer: Customer = await getCustomerById(car.customer_id);
  const phonesPromise: Promise<Phone[]> = getCustomerPhones(customer.id);
  const emailsPromise: Promise<Email[]> = getCustomerEmails(customer.id);
  const addressesPromise: Promise<Address[]> = getCustomerAddresses(
    customer.id,
  );
  const [phones, emails, addresses] = await Promise.all([
    phonesPromise,
    emailsPromise,
    addressesPromise,
  ]);
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
    <section className='space-y-6'>
      <header className='space-y-1'>
        <h1 className='text-2xl font-semibold'>Estimate details</h1>
        <p className='text-sm text-muted-foreground'>
          Customer, vehicle, and service breakdown.
        </p>
      </header>
      <div className='grid min-w-0 gap-6 lg:grid-cols-2'>
        <CustomerDetail
          customer={customer}
          phones={phones}
          addresses={addresses}
          emails={emails}
        />
        <CarDetail car={car} />
        <div className='min-w-0 lg:col-span-2'>
          <EstimateDetail estimate={estimate} totals={totals} />
          <PrintEstimateButton estimateId={estimate.id} />
        </div>
        <div className='grid min-w-0 gap-4 lg:col-span-2 lg:grid-cols-2'>
          {subs.map((sub) => (
            <SubEstimateCard key={sub.id} sub={sub} />
          ))}
        </div>
      </div>
    </section>
  );
}
