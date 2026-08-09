"use client";

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useSearchParams, useRouter } from 'next/navigation';
import { PRODUCTS, Product } from '@/data/products';
import { useInquiry } from '@/context/InquiryContext';
import { Search, Filter, ShieldCheck, FileText, Info, Check, Plus } from 'lucide-react';
import styles from './products.module.css';

const CATEGORIES = [
  "All Categories",
  "Medical Equipment",
  "Consumables",
  "Surgical Supplies",
  "Laboratory Supplies",
  "Hospital Furniture",
  "Rehabilitation",
  "Home Care",
  "PPE",
  "Logistics Services"
];

export default function CatalogBrowser() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const { addItem, items } = useInquiry();

  const initialCategory = searchParams.get('category') || "All Categories";
  const [selectedCategory, setSelectedCategory] = useState(initialCategory);
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredProducts, setFilteredProducts] = useState<Product[]>(PRODUCTS);

  // Sync category state with query parameter changes
  useEffect(() => {
    const cat = searchParams.get('category');
    if (cat && CATEGORIES.includes(cat)) {
      setSelectedCategory(cat);
    } else {
      setSelectedCategory("All Categories");
    }
  }, [searchParams]);

  // Perform searching and filtering
  useEffect(() => {
    let result = PRODUCTS;

    // Filter by Category
    if (selectedCategory !== "All Categories") {
      result = result.filter(p => p.category === selectedCategory);
    }

    // Filter by Search Query
    if (searchQuery.trim() !== "") {
      const q = searchQuery.toLowerCase();
      result = result.filter(p => 
        p.name.toLowerCase().includes(q) || 
        p.shortDescription.toLowerCase().includes(q) ||
        p.detailedDescription.toLowerCase().includes(q) ||
        p.category.toLowerCase().includes(q) ||
        p.specs.some(s => s.value.toLowerCase().includes(q))
      );
    }

    setFilteredProducts(result);
  }, [selectedCategory, searchQuery]);

  const handleCategorySelect = (category: string) => {
    setSelectedCategory(category);
    const params = new URLSearchParams(searchParams.toString());
    if (category === "All Categories") {
      params.delete('category');
    } else {
      params.set('category', category);
    }
    router.push(`?${params.toString()}`, { scroll: false });
  };

  const getCartQuantity = (productId: string) => {
    const item = items.find(i => i.product.id === productId);
    return item ? item.quantity : 0;
  };

  return (
    <div className={styles.browserLayout}>
      {/* Search and Filters Header */}
      <div className={styles.searchBarRow}>
        <div className={styles.searchWrapper}>
          <Search className={styles.searchIcon} size={20} />
          <input 
            type="text" 
            placeholder="Search by equipment name, specifications, certification numbers..." 
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className={styles.searchInput}
          />
          {searchQuery && (
            <button className={styles.clearSearchBtn} onClick={() => setSearchQuery("")}>
              ✕
            </button>
          )}
        </div>
        
        <div className={styles.resultsCounter}>
          Showing <strong>{filteredProducts.length}</strong> products
        </div>
      </div>

      <div className={styles.mainGrid}>
        {/* Sidebar Categories */}
        <aside className={styles.sidebar}>
          <div className={styles.sidebarHeader}>
            <Filter size={16} />
            <h4>Filter by Division</h4>
          </div>
          <nav className={styles.categoryNav}>
            {CATEGORIES.map((cat) => {
              const count = cat === "All Categories" 
                ? PRODUCTS.length 
                : PRODUCTS.filter(p => p.category === cat).length;
              return (
                <button
                  key={cat}
                  className={`${styles.sidebarBtn} ${selectedCategory === cat ? styles.sidebarBtnActive : ''}`}
                  onClick={() => handleCategorySelect(cat)}
                >
                  <span className={styles.sidebarBtnText}>{cat}</span>
                  <span className={styles.sidebarBtnCount}>{count}</span>
                </button>
              );
            })}
          </nav>

          <div className={styles.sidebarBanner}>
            <ShieldCheck size={20} className={styles.sidebarBannerIcon} />
            <h5>Regulatory Support</h5>
            <p>Need custom imports clearance or Ghana Food and Drugs Authority certificates? Contact our Accra compliance desk.</p>
            <Link href="/certifications" className={styles.sidebarBannerLink}>
              View Standards
            </Link>
          </div>
        </aside>

        {/* Product Cards Grid */}
        <main className={styles.productsGrid}>
          {filteredProducts.length === 0 ? (
            <div className={styles.noResults}>
              <Info size={48} />
              <h4>No Medical Products Found</h4>
              <p>We couldn't find any products matching your search term "{searchQuery}". Try selecting another category or typing different specifications.</p>
              <button 
                className="btn btn-secondary" 
                onClick={() => { setSearchQuery(""); handleCategorySelect("All Categories"); }}
                style={{ marginTop: '16px' }}
              >
                Reset Search Filters
              </button>
            </div>
          ) : (
            filteredProducts.map((product) => {
              const inCartQty = getCartQuantity(product.id);
              return (
                <div key={product.id} className={`glass-card ${styles.productCard}`}>
                  {/* Decorative Medical Icon Header */}
                  <div className={styles.cardHeaderVisual}>
                    {product.certifications && product.certifications.length > 0 && (
                      <span className={styles.complianceBadge}>
                        <ShieldCheck size={12} />
                        {product.certifications[0].issuer.includes("Ghana") ? "FDA Ghana" : "Certified"}
                      </span>
                    )}
                  </div>
                  
                  <div className={styles.cardContent}>
                    <div className={styles.categoryLabel}>{product.category}</div>
                    <div className={styles.productHeaderRow}>
                      <h3 className={styles.productName}>{product.name}</h3>
                      {product.price && <span className={styles.productPrice}>{product.price}</span>}
                    </div>
                    <p className={styles.productDesc}>{product.shortDescription}</p>
                    
                    {/* Key Specifications Preview */}
                    <div className={styles.specsPreview}>
                      {product.specs.slice(0, 2).map((spec, idx) => (
                        <div key={idx} className={styles.specRow}>
                          <span className={styles.specLabel}>{spec.label}:</span>
                          <span className={styles.specVal}>{spec.value}</span>
                        </div>
                      ))}
                    </div>

                    {/* Certification Badges & WhatsApp Link */}
                    <div className={styles.certAndWhatsappRow}>
                      <div className={styles.certBadgesRow}>
                        {product.certifications.slice(0, 1).map((cert, idx) => (
                          <span key={idx} className={styles.certBadgeText}>
                            ✓ {cert.code}
                          </span>
                        ))}
                      </div>
                      
                      <a 
                        href={`https://wa.me/233202776944?text=Hello%20Manny%20MedTech,%20I%20would%20like%20to%20enquire%20about%20${encodeURIComponent(product.name)}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={styles.whatsappInquiryLink}
                      >
                        Enquire on WhatsApp
                      </a>
                    </div>
                  </div>

                  <div className={styles.cardFooter}>
                    <Link 
                      href={`/products/${product.id}`}
                      className="btn btn-secondary"
                      style={{ flex: 1, padding: '10px 12px', fontSize: '0.85rem' }}
                    >
                      Specifications
                    </Link>
                    <button
                      className={`btn btn-primary ${inCartQty > 0 ? styles.addedBtn : ''}`}
                      onClick={() => addItem(product, 1)}
                      style={{ flex: 1.2, padding: '10px 12px', fontSize: '0.85rem' }}
                    >
                      {inCartQty > 0 ? (
                        <>
                          <Check size={14} /> Added ({inCartQty})
                        </>
                      ) : (
                        <>
                          <Plus size={14} /> Add to Quote
                        </>
                      )}
                    </button>
                  </div>
                </div>
              );
            })
          )}
        </main>
      </div>

      {/* Sourcing request banner */}
      <div className={styles.sourcingBanner}>
        <div className={styles.sourcingLeft}>
          <span className={styles.sourcingTag}>NEED A PRODUCT?</span>
          <h2>Send us the item name, photo or specification.</h2>
          <p>We will confirm availability and provide a quotation. Delivery is available throughout Ghana.</p>
        </div>
        <div className={styles.sourcingRight}>
          <a 
            href="https://wa.me/233202776944?text=Hello%20Manny%20MedTech,%20I%20would%20like%20to%20inquire%20about%20a%20product."
            target="_blank"
            rel="noopener noreferrer"
            className={`btn ${styles.whatsappBannerBtn}`}
          >
            WhatsApp +233 20 277 6944
          </a>
          <a 
            href="tel:+233202776944"
            className={`btn ${styles.callBannerBtn}`}
          >
            Call +233 20 277 6944
          </a>
        </div>
      </div>
    </div>
  );
}
