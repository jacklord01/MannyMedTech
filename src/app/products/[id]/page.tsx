import React from 'react';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { PRODUCTS } from '@/data/products';
import ProductDetailsClient from './ProductDetailsClient';
import styles from './product-detail.module.css';
import { ArrowLeft, ChevronRight } from 'lucide-react';

interface PageProps {
  params: Promise<{ id: string }>;
}

export async function generateMetadata({ params }: PageProps) {
  const { id } = await params;
  const product = PRODUCTS.find(p => p.id === id);
  
  if (!product) {
    return {
      title: "Product Not Found | Manny MedTech",
    };
  }
  
  return {
    title: `${product.name} | Manny MedTech`,
    description: ` Vetted specifications, certifications, and compliance documents for ${product.name} distributed by Manny MedTech.`,
  };
}

export default async function ProductDetailPage({ params }: PageProps) {
  const { id } = await params;
  const product = PRODUCTS.find(p => p.id === id);
  
  if (!product) {
    notFound();
  }

  return (
    <div className={styles.detailPage}>
      {/* Breadcrumbs */}
      <div className={styles.breadcrumbsBar}>
        <div className="container">
          <div className={styles.breadcrumbs}>
            <Link href="/">Home</Link>
            <ChevronRight size={14} />
            <Link href="/products">Products</Link>
            <ChevronRight size={14} />
            <span className={styles.activeBreadcrumb}>{product.name}</span>
          </div>
        </div>
      </div>

      <div className="container">
        <Link href="/products" className={styles.backLink}>
          <ArrowLeft size={16} /> Back to Catalog
        </Link>
        
        {/* Pass to Client Component for interactive elements */}
        <ProductDetailsClient product={product} />
      </div>
    </div>
  );
}
