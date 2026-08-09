# Adding Images to Your Project

Now that we have updated the website to render your logo and offer images, you need to add the actual image files you provided into the project structure.

## Steps:

1. **Locate the `public` folder**: In the root of your `MannyMedTech` folder, you will see a folder named `public`. Everything inside this folder is served statically by Next.js.
2. **Add the Logo**: 
   - Rename your logo image file to **`logo.png`**.
   - Copy and paste it directly into the `public` folder.
   - The path should be exactly: `MannyMedTech/public/logo.png`.
3. **Create the `offers` folder**: 
   - Inside the `public` folder, create a new subfolder named **`offers`**.
4. **Add the Offer Images**: 
   - Rename your Cesarean Pack flyer to **`cesarean-offer.jpg`**.
   - Rename your Laparotomy Pack flyer to **`laparotomy-offer.jpg`**.
   - Copy both files into the new `offers` folder.
   - The paths should be exactly: `MannyMedTech/public/offers/cesarean-offer.jpg` and `MannyMedTech/public/offers/laparotomy-offer.jpg`.

Once you have done this, your logo will appear perfectly in the navigation bar and footer, and the two offer banners will render on the homepage "This Week's Offers" section!
