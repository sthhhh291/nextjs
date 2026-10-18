import { Card, CardHeader, CardTitle, CardContent, CardDescription } from "@/components/ui/card"
import { LoaderIcon } from "lucide-react"

export default function loadingCar() {
    return (
        <section className='space-y-6'>
      <header className='space-y-1'>
        <h1 className='text-2xl font-semibold'>Vehicle details</h1>
        <p className='text-sm text-muted-foreground'>
          Vehicle and owner information, with related estimates.
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
            <LoaderIcon className="animate-spin" />
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
        <Card className='lg:col-span-2'>
          <CardHeader>
            <CardTitle>Estimates</CardTitle>
          </CardHeader>
          <CardContent className='grid gap-2 sm:grid-cols-2 lg:grid-cols-3'>
           <LoaderIcon className="animate-spin" />
          </CardContent>
        </Card>
      </div>
    </section>
    )
}