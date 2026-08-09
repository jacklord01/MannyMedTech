# How to Add Products and Descriptions

This guide explains how to add new products, update their descriptions, and add product images to the Manny MedTech website.

## 1. Locate the Products Data File
All products are stored in a single TypeScript file located at:
`src/data/products.ts`

Open this file in your code editor.

## 2. Structure of a Product
Each product is defined as an object in the `PRODUCTS` array. Here is the structure:

```typescript
{
  id: "unique-product-id", // URL friendly string (e.g. "laparotomy-packs")
  name: "Product Name", // The display name
  category: "Surgical Supplies", // Must be one of the defined categories
  price: "GH¢ 350", // Optional price field
  shortDescription: "A brief summary for the catalog page.",
  detailedDescription: "A longer description for the product details page.",
  image: "/products/product-image-name.jpg", // Optional image path (see below)
  imagePlaceholder: "surgical", // Fallback icon (e.g. 'ecg', 'surgical', 'ppe')
  isAvailable: true, // Set to false to show "Out of Stock"
  specs: [ // Technical specifications list
    { label: "Sterility", value: "Sterile and ready to use" }
  ],
  certifications: [ // Relevant compliance docs
    {
      title: "ISO 13485:2016",
      code: "ISO-SUT-9844",
      issuer: "SGS",
      issueDate: "2023-05-10",
      expiryDate: "2026-05-09",
      status: "active"
    }
  ]
}
```

## 3. Adding Product Images
To add an image for a product:
1. Prepare your image (recommended size: at least 800x600px, under 300KB).
2. Save the image in the `public/products/` folder (e.g. `public/products/my-new-product.jpg`).
3. In `src/data/products.ts`, update the `image` field for the corresponding product to point to the file:
   `image: "/products/my-new-product.jpg"`

If you do not provide an `image` field, the system will automatically show a premium medical placeholder illustration based on the `imagePlaceholder` field.

## 4. Adding Supplier Certificates (PDFs/Images)
To add a visual document for a product's Supplier Certificate:
1. Save your certificate file (PDF, JPG, or PNG) inside the `public/certificates/` folder (you may need to create the `certificates` folder first).
2. Example path: `public/certificates/laparotomy-cert.pdf`.
3. In `src/data/products.ts`, update the `certifications` array for your product. Add a `documentUrl` field that points to your file:
   ```typescript
   certifications: [
     {
       title: "Supplier Certificate",
       code: "CERT-001",
       issuer: "Factory Name",
       issueDate: "2023-05-10",
       expiryDate: "2026-05-09",
       status: "active",
       documentUrl: "/certificates/laparotomy-cert.pdf" // ADD THIS LINE
     }
   ]
   ```
4. Now, when a user clicks the certificate in the product details, it will load that file.

## 5. Save and Test
Once you have made your changes to `src/data/products.ts`:
1. Save the file.
2. Run your local development server (`npm run dev`) if it's not already running.
3. Refresh the website to see your new products and updated descriptions in the Catalog.
