import { getMarkup } from "@/actions/markup";
import type { Markup } from "@/types";
import MarkupForm from "../ui/markup-form";

export default async function MarkupsPage() {
  const markups: Markup[] = await getMarkup();
  return (
    <section className='mx-auto max-w-5xl space-y-6'>
      <header className='space-y-1'>
        <h1 className='text-2xl font-semibold'>Markup rules</h1>
        <p className='text-sm text-muted-foreground'>
          Manage the part-price markup schedule.
        </p>
      </header>
      <div className='space-y-3'>
        <h2 className='text-base font-semibold'>Add markup rule</h2>
        <MarkupForm markup={null} />
      </div>
      <div className='space-y-3'>
        <h2 className='text-base font-semibold'>Existing rules</h2>
        <div className='grid gap-3'>
          {markups.map((markup) => (
            <MarkupForm key={markup.id} markup={markup} />
          ))}
        </div>
      </div>
    </section>
  );
}
