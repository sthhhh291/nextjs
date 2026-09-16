import {
  getEstimateById,
  getSubsByEstimateId,
} from "@/actions/estimate";
import { getCarById } from "@/actions/car";
import { getLaborPartsOilBySubId } from "@/actions/sub-estimate";
import type {Estimate, Car, Customer, Sub_estimate} from "@/types"
import EstimateDetail from "@/app/(loggedin)/ui/estimate-detail";
import CarDetail from "@/app/(loggedin)/ui/car-detail";
import { getCustomerById } from "@/actions/customer";
import CustomerDetail from "../../ui/customer-detail";
import SubEstimateCard from "../../ui/sub-estimate-card";

export default async function CarPage({
  params,
}: {
  params: { id: string };
}) {
  const estimateId = Number((await params).id);
  const estimate: Estimate = await getEstimateById(estimateId);
  const car: Car = await getCarById(estimate.car_id);
  const customer : Customer = await getCustomerById(car.customer_id);
  const subs: Sub_estimate[] = await getSubsByEstimateId(estimateId);
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
        <CustomerDetail customer={customer} phones={[]} addresses={[]} emails={[]} />
        <CarDetail car={car}/>
        <EstimateDetail estimate={estimate} />
        {subs.map(sub => (
            <SubEstimateCard key={sub.id} sub={sub} />
        ))}
        {/* {subs.map((sub) => (
          <div key={sub.id}>
            <div>{sub.description}</div>
            <div>
              {sub.labor?.map((lab) => (
                <div key={lab.id}>
                  {lab.description} ({lab.hours} hours): price -: {lab.price}
                </div>
              ))}
            </div>
            <div>
              {sub.parts?.map((part) => (
                <div key={part.id}>
                  {part.description} Qty: ({part.quantity} ): price -: {part.price}
                </div>
              ))}
            </div>
            <div>
              {sub.oil?.map((part) => (
                <div key={part.id}>
                  {part.description} Qty: ({part.quantity} ): price -: {part.price}
                </div>
              ))}
            </div>
            <div>
              <h2>Totals</h2>
              Labor: {sub.totals?.labor_total} Parts: {sub.totals?.parts_total} Oil: {sub.totals?.oil_total} SubTotal: {sub.totals?.sub_total} Tax: {sub.totals?.tax} Fees: {sub.totals?.shop_fees} Total: {sub.totals?.grand_total}
            </div>
          </div>
        ))} */}
      </div>
    </>
  );
}
