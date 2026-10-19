/** All amounts are integers in pesewas (1 GH₵ = 100 pesewas), which is also Paystack's subunit for GHS. */
export function formatCedis(pesewas: number): string {
  const cedis = pesewas / 100;
  return `GH₵${cedis.toLocaleString("en-GH", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
}

export function cedisToPesewas(input: string): number | null {
  const cleaned = input.replace(/[,\s]/g, "").replace(/^GH₵|^GHS/i, "");
  if (!/^\d+(\.\d{1,2})?$/.test(cleaned)) return null;
  const [whole = "0", fraction = ""] = cleaned.split(".");
  return Number(whole) * 100 + Number(fraction.padEnd(2, "0"));
}

/** Tax on a subtotal, rounded half-up to the nearest pesewa. Rate is a percentage, e.g. 21.9. */
export function taxOn(subtotal: number, ratePercent: number): number {
  if (ratePercent <= 0) return 0;
  return Math.round((subtotal * Math.round(ratePercent * 1000)) / 100_000);
}

const ONES = ["", "One", "Two", "Three", "Four", "Five", "Six", "Seven", "Eight", "Nine", "Ten", "Eleven", "Twelve",
  "Thirteen", "Fourteen", "Fifteen", "Sixteen", "Seventeen", "Eighteen", "Nineteen"];
const TENS = ["", "", "Twenty", "Thirty", "Forty", "Fifty", "Sixty", "Seventy", "Eighty", "Ninety"];
const SCALES: [number, string][] = [[1_000_000_000, "Billion"], [1_000_000, "Million"], [1_000, "Thousand"]];

function underThousand(n: number): string {
  const hundreds = Math.floor(n / 100);
  const rest = n % 100;
  const restWords = rest < 20 ? ONES[rest] : `${TENS[Math.floor(rest / 10)]}${rest % 10 ? `-${ONES[rest % 10]}` : ""}`;
  if (!hundreds) return restWords;
  return rest ? `${ONES[hundreds]} Hundred and ${restWords}` : `${ONES[hundreds]} Hundred`;
}

function integerWords(n: number): string {
  if (n === 0) return "Zero";
  const parts: string[] = [];
  let remainder = n;
  for (const [size, name] of SCALES) {
    if (remainder >= size) {
      parts.push(`${underThousand(Math.floor(remainder / size))} ${name}`);
      remainder %= size;
    }
  }
  if (remainder) parts.push(parts.length && remainder < 100 ? `and ${underThousand(remainder)}` : underThousand(remainder));
  return parts.join(" ");
}

/** e.g. 505000 → "Five Thousand and Fifty Ghana Cedis Only" (British style, as on printed invoices). */
export function amountInWords(pesewas: number): string {
  const cedis = Math.floor(pesewas / 100);
  const remainder = pesewas % 100;
  const cedisPart = `${integerWords(cedis)} Ghana Cedi${cedis === 1 ? "" : "s"}`;
  return remainder ? `${cedisPart} and ${integerWords(remainder)} Pesewas Only` : `${cedisPart} Only`;
}
