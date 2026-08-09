"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { useInquiry } from '@/context/InquiryContext';
import { ShoppingBag, X, Trash2, Plus, Minus, Menu, FileText, Check, ShieldCheck, Activity } from 'lucide-react';
import styles from './Navbar.module.css';

export const Navbar: React.FC = () => {
  const pathname = usePathname();
  const { items, isCartOpen, setCartOpen, toggleCartOpen, removeItem, updateQuantity, updateNotes } = useInquiry();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const cartItemsCount = items.reduce((sum, item) => sum + item.quantity, 0);

  const navLinks = [
    { name: 'Products Catalog', path: '/products' },
    { name: 'Logistics Services', path: '/logistics' },
    { name: 'Certifications', path: '/certifications' },
  ];

  return (
    <>
      <header className={styles.header}>
        <div className={`container ${styles.headerContainer}`}>
          {/* Logo */}
          <Link href="/" className={styles.logo} onClick={() => setMobileMenuOpen(false)}>
            <div className={styles.logoImageWrapper}>
              <Image 
                src="/logo.png" 
                alt="Manny MedTech Logo" 
                width={200}
                height={60}
                style={{ objectFit: 'contain' }}
                priority
              />
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className={styles.desktopNav}>
            {navLinks.map((link) => (
              <Link 
                key={link.path} 
                href={link.path}
                className={`${styles.navLink} ${pathname === link.path ? styles.activeNavLink : ''}`}
              >
                {link.name}
              </Link>
            ))}
          </nav>

          {/* Actions */}
          <div className={styles.actions}>
            <button 
              className={`${styles.cartBtn} ${cartItemsCount > 0 ? styles.cartBtnActive : ''}`} 
              onClick={toggleCartOpen}
              aria-label="Open Quote Cart"
            >
              <FileText size={20} />
              <span>Inquiry List</span>
              {cartItemsCount > 0 && (
                <span className={styles.cartBadge}>{cartItemsCount}</span>
              )}
            </button>

            <Link href="/inquire" className={`btn btn-primary ${styles.quoteBtn}`}>
              Request Quote
            </Link>

            {/* Mobile Menu Toggle */}
            <button 
              className={styles.menuToggle} 
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label="Toggle Navigation Menu"
            >
              {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile Menu Panel */}
        {mobileMenuOpen && (
          <div className={styles.mobileNav}>
            {navLinks.map((link) => (
              <Link 
                key={link.path} 
                href={link.path}
                className={`${styles.mobileNavLink} ${pathname === link.path ? styles.activeMobileNavLink : ''}`}
                onClick={() => setMobileMenuOpen(false)}
              >
                {link.name}
              </Link>
            ))}
            <div className={styles.mobileNavActions}>
              <Link 
                href="/inquire" 
                className="btn btn-primary"
                onClick={() => setMobileMenuOpen(false)}
                style={{ width: '100%' }}
              >
                Request Quote
              </Link>
            </div>
          </div>
        )}
      </header>

      {/* Cart Slider Drawer Backdrop */}
      {isCartOpen && (
        <div className={styles.backdrop} onClick={() => setCartOpen(false)} />
      )}

      {/* Cart Slider Drawer */}
      <div className={`${styles.drawer} ${isCartOpen ? styles.drawerOpen : ''}`}>
        <div className={styles.drawerHeader}>
          <div className={styles.drawerTitleContainer}>
            <FileText size={22} className={styles.drawerHeaderIcon} />
            <h3>Quote Inquiry List</h3>
          </div>
          <button className={styles.closeBtn} onClick={() => setCartOpen(false)}>
            <X size={24} />
          </button>
        </div>

        <div className={styles.drawerContent}>
          {items.length === 0 ? (
            <div className={styles.emptyCart}>
              <ShoppingBag size={64} strokeWidth={1} />
              <p>Your inquiry list is empty.</p>
              <span>Explore our medical equipment catalog and add items you need a quote or logistics estimation for.</span>
              <Link 
                href="/products" 
                className="btn btn-primary"
                onClick={() => setCartOpen(false)}
                style={{ marginTop: '20px' }}
              >
                Browse Catalog
              </Link>
            </div>
          ) : (
            <>
              <div className={styles.cartNotice}>
                <ShieldCheck size={16} />
                <span>Quotes are processed within 1-2 business hours for Ghana and international clinics.</span>
              </div>
              
              <div className={styles.cartItemsList}>
                {items.map((item) => (
                  <div key={item.product.id} className={styles.cartItem}>
                    <div className={styles.itemMeta}>
                      <div>
                        <h4>{item.product.name}</h4>
                        <span className={styles.itemCategory}>{item.product.category}</span>
                      </div>
                      <button 
                        className={styles.removeBtn} 
                        onClick={() => removeItem(item.product.id)}
                        title="Remove item"
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>

                    <div className={styles.itemSpecsSummary}>
                      {item.product.certifications && item.product.certifications.length > 0 && (
                        <span className={styles.certBadge}>
                          ✓ {item.product.certifications[0].code} Verified
                        </span>
                      )}
                    </div>

                    <div className={styles.itemControls}>
                      <div className={styles.quantityControl}>
                        <button 
                          className={styles.qtyBtn}
                          onClick={() => updateQuantity(item.product.id, item.quantity - 1)}
                        >
                          <Minus size={14} />
                        </button>
                        <span className={styles.qtyVal}>{item.quantity}</span>
                        <button 
                          className={styles.qtyBtn}
                          onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
                        >
                          <Plus size={14} />
                        </button>
                      </div>
                    </div>

                    <div className={styles.itemNotes}>
                      <input 
                        type="text" 
                        placeholder="Add special requirements or questions..." 
                        value={item.notes || ''}
                        onChange={(e) => updateNotes(item.product.id, e.target.value)}
                        className={styles.notesInput}
                      />
                    </div>
                  </div>
                ))}
              </div>

              <div className={styles.drawerFooter}>
                <div className={styles.summaryRow}>
                  <span>Total Items:</span>
                  <strong>{cartItemsCount} products</strong>
                </div>
                <p className={styles.noticeText}>
                  * Pricing is customized based on order size, delivery location in Ghana, and specific regulatory clearing requirements.
                </p>
                <Link 
                  href="/inquire" 
                  className={`btn btn-primary ${styles.checkoutBtn}`}
                  onClick={() => setCartOpen(false)}
                >
                  Proceed to Request Quote
                </Link>
              </div>
            </>
          )}
        </div>
      </div>
    </>
  );
};
