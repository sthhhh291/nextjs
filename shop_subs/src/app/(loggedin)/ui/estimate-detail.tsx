"use client";

import { Card, CardContent, CardHeader } from "@/components/ui/card";
import type { Estimate } from "@/types";

export default function EstimateDetail(params:{estimate:Estimate}) {
  const estimate = params.estimate;

  return (
    <Card>
      <CardHeader>
      ID: {estimate.id}

      </CardHeader>
      <CardContent>
        Date: {estimate.date}
        </CardContent>
      <CardContent>
        Type: {estimate.estimate_type}
      </CardContent>
      <CardContent>
        Mileage: {estimate.mileage}
      </CardContent>
      <CardContent>
        Hours taken: {estimate.hours}
      </CardContent>
    </Card>
  )
}
