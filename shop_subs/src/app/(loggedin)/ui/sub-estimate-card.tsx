import { Card, CardContent, CardHeader } from "@/components/ui/card";
import LaborForm from "@/app/(loggedin)/ui/labor-form";
import { Sub_estimate } from "@/types";

export default function SubEstimateCard(params: { sub: Sub_estimate }) {
  const sub = params.sub;
  return (
    <Card>
      <Card>
        <h2>Actions</h2>
        <LaborForm labor={null} sub_id={sub.id} />
      </Card>
      <CardHeader>{sub.description}</CardHeader>
      {/* labor */}
      <CardHeader>Labor:</CardHeader>
      {sub.labor?.map((lab) => (
        <div key={lab.id}>
          <CardContent>
            {lab.description} Price: {lab.price}{" "}
            <LaborForm labor={lab} sub_id={sub.id} />
          </CardContent>
        </div>
      ))}
      <CardContent>Total: {sub.totals?.labor_total}</CardContent>
      <CardHeader>Parts:</CardHeader>
      {sub.parts?.map((lab) => (
        <div key={lab.id}>
          <CardContent>
            {lab.description} Qty: {lab.quantity} Price: {lab.price} Extended:{" "}
            {lab.quantity * lab.price}
          </CardContent>
        </div>
      ))}
      <CardContent>Total: {sub.totals?.parts_total}</CardContent>
      <CardHeader>Oil:</CardHeader>
      {sub.oil?.map((lab) => (
        <div key={lab.id}>
          <CardContent>
            {lab.description} Qty: {lab.quantity} Price: {lab.price} Extended:{" "}
            {lab.quantity * lab.price}
          </CardContent>
        </div>
      ))}
      <CardContent>Total: {sub.totals?.oil_total}</CardContent>
      <CardHeader>Totals:</CardHeader>
      <CardContent>
        Subtotal: {sub.totals?.sub_total} Tax: {sub.totals?.tax} Fees:{" "}
        {sub.totals?.shop_fees} Total {sub.totals?.grand_total}
      </CardContent>
    </Card>
  );
}
