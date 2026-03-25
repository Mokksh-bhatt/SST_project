import React from 'react';
import { useWishlist } from '../context/WishlistContext';
import ProductGrid from '../components/ProductGrid';
import ProductCard from '../components/ProductCard';
import { Link } from 'react-router-dom';
import { FiHeart } from 'react-icons/fi';
import { motion } from 'framer-motion';

const Wishlist = () => {
  const { wishlistItems } = useWishlist();

  if (wishlistItems.length === 0) {
    return (
      <div style={{ padding: '8rem 2rem', textAlign: 'center', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '1.5rem' }}>
        <div style={{ width: '80px', height: '80px', background: '#fee2e2', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--danger)', marginBottom: '1rem' }}>
          <FiHeart size={40} />
        </div>
        <h2>Your wishlist is empty</h2>
        <p style={{ color: 'var(--text-muted)' }}>Save items you love here to easily find them later.</p>
        <Link to="/products" className="btn btn-primary" style={{ marginTop: '1rem', padding: '1rem 2rem' }}>
          Explore Products
        </Link>
      </div>
    );
  }

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '2rem' }}>
        <h1 style={{ marginBottom: 0 }}>My Wishlist</h1>
        <span style={{ background: 'var(--background)', padding: '0.25rem 0.75rem', borderRadius: '999px', fontSize: '0.875rem', fontWeight: 600, color: 'var(--text-muted)' }}>
          {wishlistItems.length} items
        </span>
      </div>
      
      <ProductGrid>
        {wishlistItems.map(item => (
          <ProductCard key={item.productId} product={item.product} />
        ))}
      </ProductGrid>
    </motion.div>
  );
};

export default Wishlist;
