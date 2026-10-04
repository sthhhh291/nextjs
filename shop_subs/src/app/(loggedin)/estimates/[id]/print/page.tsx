import { getCarById } from "@/actions/car";
import { getCustomerAddresses, getCustomerById, getCustomerEmails, getCustomerPhones } from "@/actions/customer";
import { getEstimateById, getSubsByEstimateId } from "@/actions/estimate";
import { getLaborPartsOilBySubId } from "@/actions/sub-estimate";
import EstimatePrint from "@/app/(loggedin)/ui/estimate-print";
import { Estimate, Sub_estimate } from "@/types";
import { notFound } from "next/navigation";

export default async function EstimatePrintPage({
    params,
}: {
    params: Promise<{ id: string }>;
}) {
    const estimateId = Number((await params).id);
    if (!Number.isInteger(estimateId) || estimateId < 1) notFound();

    const estimatePromise: Promise<Estimate> = getEstimateById(estimateId);
    const subPromise: Promise<Sub_estimate[]> = getSubsByEstimateId(estimateId);
    const [estimate, subs] = await Promise.all([estimatePromise, subPromise]);
    subs.forEach(async (sub) => {
        const laborPartsOilPromise = getLaborPartsOilBySubId(sub.id);
        const laborPartsOil = await laborPartsOilPromise;
        sub.labor = laborPartsOil.labor;
        sub.parts = laborPartsOil.parts;
        sub.oil = laborPartsOil.oil;
        sub.totals = laborPartsOil.totals;
    });
    // const estimate = await getEstimateById(estimateId);
    const car = await getCarById(estimate.car_id);
    const customer = await getCustomerById(car.customer_id);
    const phonesPromise = getCustomerPhones(customer.id);
    const emailsPromise = getCustomerEmails(customer.id);
    const addressesPromise = getCustomerAddresses(customer.id);
    const [phones, emails, addresses] = await Promise.all([
        phonesPromise,
        emailsPromise,
        addressesPromise,
    ]);
    customer.phones = phones;
    customer.emails = emails;
    customer.addresses = addresses;

    return <EstimatePrint estimate={estimate} car={car} customer={customer} subs={subs} />;
}