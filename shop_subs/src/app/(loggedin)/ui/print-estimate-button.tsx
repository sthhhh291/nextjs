'use client';

import { Button } from "@/components/ui/button";

export default function PrintEstimateButton(params: { estimateId: number }) {
  const estimateId = params.estimateId;

  return (
    <Button
      variant='outline'
      size='sm'
      onClick={() =>
        window.open(
          `/estimates/${estimateId}/print`,
          "_blank",
          "noopener,noreferrer",
        )
      }
    >
      Print
    </Button>
  )
}
