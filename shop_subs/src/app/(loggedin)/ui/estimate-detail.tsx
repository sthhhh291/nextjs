"use client";

import { Card, CardContent, CardHeader } from "@/components/ui/card";
import type { Estimate } from "@/types";
import EstimateForm from "./estimate-form";
import SubForm from "./sub-form";

export default function EstimateDetail(params: { estimate: Estimate }) {
  const estimate = params.estimate;

  return (
    <Card>
      <CardHeader>ID: {estimate.id}</CardHeader>
      <CardContent>Date: {estimate.date}</CardContent>
      <CardContent>Type: {estimate.estimate_type}</CardContent>
      <CardContent>Mileage: {estimate.mileage}</CardContent>
      <CardContent>Hours taken: {estimate.hours}</CardContent>
      <CardHeader>
        <SubForm sub={null} estimate_id={estimate.id} />
      </CardHeader>
      <EstimateForm estimate={estimate} car_id={estimate.car_id} />
    </Card>
  );
}
