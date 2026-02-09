export function formatDate(dateString: string): string {
  const date = new Date(dateString);
  return date.toLocaleDateString("fr-FR", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

export function formatPrice(price: number): string {
  return price.toFixed(2).replace(".", ",") + " \u20ac";
}

export function isFutureDate(dateString: string): boolean {
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const date = new Date(dateString);
  return date >= today;
}
