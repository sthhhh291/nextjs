import { LoaderIcon } from "lucide-react";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";

export default function loadingEstimate() {
    return (
        <section className='space-y-6'>
      <header className='space-y-1'>
        <h1 className='text-2xl font-semibold'>Estimate details</h1>
        <p className='text-sm text-muted-foreground'>
          Customer, vehicle, and service breakdown.
        </p>
      </header>
      <div className='grid min-w-0 gap-6 lg:grid-cols-2'>
        <Card className='min-w-0'>
      <CardHeader className='border-b'>
        <div className='flex flex-wrap items-start justify-between gap-3'>
          <div className='space-y-1'>
            <CardTitle>Customer</CardTitle>
            <CardDescription>  
                <LoaderIcon className="animate-spin" />
            </CardDescription>
          </div>
        </div>
      </CardHeader>
      <CardContent className='space-y-5 pt-5'>
        <section className='space-y-3'>
          <div className='flex flex-wrap items-center justify-between gap-3'>
            <h3 className='text-sm font-semibold'>Contact details</h3>
            <div className='flex flex-wrap gap-2'>
                <LoaderIcon className="animate-spin" />
            </div>
          </div>
          <div className='divide-y rounded-lg border'>
            <LoaderIcon className="animate-spin" />
          </div>
        </section>
      </CardContent>
    </Card>
         <Card className='min-w-0'>
      <CardHeader className='border-b'>
        <CardTitle>Vehicle details</CardTitle>
        <CardDescription>
          <LoaderIcon className="animate-spin" />
        </CardDescription>
      </CardHeader>
      <CardContent className='space-y-3 pt-5'>
        <h3 className='text-sm font-semibold'>Actions</h3>
        <LoaderIcon className="animate-spin" />
      </CardContent>
    </Card>
        <div className='min-w-0 lg:col-span-2'>
            <LoaderIcon className="animate-spin" />
        </div>
        <div className='grid min-w-0 gap-4 lg:col-span-2 lg:grid-cols-2'>
         <LoaderIcon className="animate-spin" />
        </div>
      </div>
    </section>
    )
}