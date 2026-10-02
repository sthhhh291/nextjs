export { cn } from "cn"

export function formatCurrency(value: number, currency: string = "USD"): string {
  // if value is NaN, return $0.00
  if (isNaN(value)) {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency,
    }).format(0)
  }
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency,
  }).format(value)
}   

export function formatDate(date: Date, locale: string = "en-US"): string {
  return new Intl.DateTimeFormat(locale, {
    year: "numeric",
    month: "long",
    day: "numeric",
  }).format(date)
}