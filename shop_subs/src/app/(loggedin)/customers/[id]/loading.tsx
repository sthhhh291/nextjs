import { Card, CardHeader, CardTitle, CardContent, CardDescription } from '@/components/ui/card'
import {LoaderIcon} from 'lucide-react'

export default function customerLoading() {
    return (
        <section className='grid min-w-0 gap-6 lg:grid-cols-[minmax(0,1.5fr)_minmax(16rem,0.7fr)]'>
      <div className='min-w-0'>
        <Card className='min-w-0'>
      <CardHeader className='border-b'>
        <div className='flex flex-wrap items-start justify-between gap-3'>
          <div className='space-y-1'>
            <CardTitle>Customer</CardTitle>
            <CardDescription>
              <LoaderIcon className='animate-spin' />
            </CardDescription>
          </div>
        </div>
      </CardHeader>
      <CardContent className='space-y-5 pt-5'>
        <section className='space-y-3'>
          <div className='flex flex-wrap items-center justify-between gap-3'>
            <h3 className='text-sm font-semibold'>Contact details</h3>
            <div className='flex flex-wrap gap-2'>
              <LoaderIcon className='animate-spin' />
            </div>
          </div>
          <div className='divide-y rounded-lg border'>
            <LoaderIcon className='animate-spin' />
          </div>
        </section>
      </CardContent>
    </Card>
      </div>
      <div className='min-w-0'>
        <Card>
          <CardHeader>
            <CardTitle>Vehicles</CardTitle>
          </CardHeader>
          <CardContent className='grid gap-2'>
            <LoaderIcon className='animate-spin' />
          </CardContent>
        </Card>
      </div>
    </section>
    )
}