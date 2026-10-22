# Product Images

Drop product image files into this folder, then update the corresponding product entry in:
`src/data/products.ts`

Set the `image` field to the relative path from `/public/`, e.g.:

```ts
image: "/products/laparotomy-pack.jpg",
```

## Supported formats
- `.jpg` / `.jpeg`
- `.png`
- `.webp` (recommended for best performance)

## Recommended image size
- **Width**: 800px minimum
- **Height**: 600px minimum
- **Aspect ratio**: 4:3 or 3:2
- **File size**: Under 300KB (use https://squoosh.app to compress)

## Current product IDs (use as filenames for clarity)
- `laparotomy-packs`
- `csection-packs`
- `biopsy-needles`
- `hernia-mesh`
- `rehab-gloves`
- `protective-goggles`
- `wheelchairs`
- `dental-xray`
- `digital-xray-system`
- `mobile-xray-unit`
