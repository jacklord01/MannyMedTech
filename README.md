# Manny MedTech website

## Online orders, invoices & payments

Customers add products to the **Inquiry List** and submit it at `/inquire`.

- **All items priced** (e.g. Laparotomy Packs `GH¢ 350`): an invoice is issued immediately at a private link (`/order/<id>?t=<token>`) with a **Pay now with Paystack** button (card, mobile money, bank).
- **Any item without a price** (e.g. X-ray systems): the order is saved as a quotation request. Staff price it at **`/admin`** (password protected) and issue the invoice. The same link then shows the invoice and Pay now button, and the sales desk can send it on WhatsApp in one click.
- Payments are confirmed server-side: the site re-verifies each transaction with Paystack (amount, currency and invoice) before marking it **Paid**. The Paystack webhook handles customers who close their browser during payment.
- Invoices are ink-friendly (black on white) and include amount in words, notes and a signature line. Use **Print / save invoice PDF**.
- Staff can record offline payments (bank transfer, cash, MoMo) and cancel orders.

Prices are read from the `price` field in `src/data/products.ts` (`"GH¢ 350"`). Remove `price` to make an item quote-only.

### Setup

1. `cp .env.example .env.local` and fill it in (all settings are described there).
2. **Orders database**: create a Supabase project, run `supabase/schema.sql` in its SQL editor, then set `SUPABASE_URL` and `SUPABASE_SERVICE_ROLE_KEY`. Without these, local development saves orders to `.data/orders.json`; production refuses to run without a database.
3. **Paystack**: set `PAYSTACK_SECRET_KEY` (test key first). In the Paystack dashboard → Settings → API Keys & Webhooks, set the webhook URL to `https://<your-domain>/api/paystack/webhook`. Make a test payment, check the invoice shows Paid, then switch to the live key.
4. Set `NEXT_PUBLIC_SITE_URL` to the live domain **before building**, and `ADMIN_PASSWORD` (12+ characters).
5. **Tax**: `INVOICE_TAX_RATE_PERCENT` is 0 by default. Confirm the VAT/levy rate with your accountant before setting it.

```bash
npm install
npm run dev        # http://localhost:3001
npm test           # pricing, totals and amount-in-words tests
```

---

This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
