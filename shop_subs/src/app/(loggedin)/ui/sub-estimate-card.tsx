"use client";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import LaborForm from "@/app/(loggedin)/ui/labor-form";
import PartForm from '@/app/(loggedin)/ui/part-form';
import { Sub_estimate } from "@/types";
import { deletePart } from "@/actions/parts";
import { deleteLabor } from "@/actions/labor";
import { deleteOil } from "@/actions/oil";
import { Button } from "@/components/ui/button";
import { Trash } from "lucide-react";
import OilForm from "./oil-form";

export default function SubEstimateCard(params: { sub: Sub_estimate }) {
  const sub = params.sub;
  function handleDeletePart(id: number) {
    const conf = confirm("Are you sure you want to delete part item?");
    if (conf) {
      deletePart(id, sub.id);
    }
  }
  function handleDeleteLabor(id:number) {
    const conf = confirm("Are you sure you want to delete Labor item?");
    if (conf) {
      deleteLabor(id,sub.id);
    }
  }
  function handleDeleteOil(id:number) {
    const conf = confirm("Are you sure you want to delete Labor item?");
    if (conf) {
      deleteOil(id,sub.id);
    }
  }
  return (
    <Card>
      <Card>
        <h2>Actions</h2>
        <LaborForm labor={null} sub_id={sub.id} />
        <PartForm part={null} sub_id={sub.id} />
        <OilForm oil={null} sub_id={sub.id} />
      </Card>
      <CardHeader>{sub.description}</CardHeader>
      {/* labor */}
      <CardHeader>Labor:</CardHeader>
      {sub.labor?.map((lab) => (
        <div key={lab.id}>
          <CardContent>
            {lab.description} Price: {lab.price}{" "}
            <LaborForm labor={lab} sub_id={sub.id} />
            <Button onClick={() => handleDeleteLabor(lab.id)}>
              <Trash />
            </Button>
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
            <PartForm part={lab} sub_id={sub.id} />
            <Button onClick={() => handleDeletePart(lab.id)}>
              <Trash />
            </Button>
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
            <OilForm oil={lab} sub_id={sub.id} />
            <Button onClick={() => handleDeleteOil(lab.id)}>
              <Trash />
            </Button>
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
