import React, { Suspense } from 'react';
import CatalogBrowser from './CatalogBrowser';
import styles from './products.module.css';

export const metadata = {
  title: "Product Catalog | Manny MedTech",
  description: "Browse fully certified medical equipment, surgical supplies, lab reagents, consumables, hospital furniture, rehabilitation gear, and PPE distributed by Manny MedTech in Ghana.",
};

export default function ProductsPage() {
  return (
    <div className={styles.catalogPage}>
      <div className={styles.catalogHeaderBanner}>
        <div className="container">
          <h1>Medical Supply Divisions</h1>
          <p>Explore high-quality medical supplies, surgical instruments, lab reagents, and cold-chain logistics services.</p>
        </div>
      </div>
      
      <div className="container">
        <Suspense fallback={
          <div className={styles.loadingContainer}>
            <div className={styles.spinner}></div>
            <p>Loading Manny MedTech catalog...</p>
          </div>
        }>
          <CatalogBrowser />
        </Suspense>
      </div>
    </div>
  );
}
