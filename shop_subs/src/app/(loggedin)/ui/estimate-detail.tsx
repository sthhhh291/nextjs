"use client";

import { Card } from "@/components/ui/card";
import type { Estimate } from "@/types";

export default function EstimateDetail(params:{estimate:Estimate}) {
  const estimate = params.estimate;

  return (
    <Card>
      ID: {estimate.id}
    </Card>
  )
}
