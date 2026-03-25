import React from 'react';
import { Link } from 'react-router-dom';
import { useProducts } from '../hooks/useProducts';
import ProductCard from '../components/ProductCard';
import { motion } from 'framer-motion';

const Home = () => {
  const { products, loading } = useProducts();
  const featured = products.slice(0, 4);

  return (
    <div style={{ marginTop: '-4rem' }}>
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.2 }}
        style={{ 
          height: '80vh', 
          minHeight: '600px',
          background: 'var(--surface-low)', 
          position: 'relative',
          display: 'flex',
          alignItems: 'center',
          overflow: 'hidden'
        }}
      >
        <div style={{ padding: '0 10%', zIndex: 2, maxWidth: '800px' }}>
          <h1 style={{ fontSize: '4.5rem', lineHeight: 1.1, marginBottom: '1.5rem', color: 'var(--primary)', textTransform: 'uppercase' }}>The Editorial<br/>Boutique.</h1>
          <p style={{ fontFamily: 'Inter', fontSize: '1.125rem', color: 'var(--text-muted)', marginBottom: '3rem', maxWidth: '400px', letterSpacing: '0.02em', lineHeight: 1.8 }}>
            Curated collections for the modern aesthete. Minimalist design, maximalist impact.
          </p>
          <Link to="/products" className="btn btn-primary" style={{ padding: '1rem 3rem', fontSize: '0.875rem', textTransform: 'uppercase', letterSpacing: '0.1em' }}>
            Shop Collection
          </Link>
        </div>
        <div style={{ position: 'absolute', right: '0', top: '0', width: '55%', height: '100%', background: 'url(https://images.unsplash.com/photo-1490481651871-ab68de25d43d?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80) center/cover', opacity: 0.9 }}></div>
      </motion.div>

      <div style={{ padding: '6rem 2rem', maxWidth: '1280px', margin: '0 auto' }}>
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginBottom: '4rem', textAlign: 'center' }}>
          <h2 style={{ fontSize: '2.5rem', textTransform: 'uppercase', marginBottom: '1rem' }}>Curated Arrivals</h2>
          <Link to="/products" style={{ borderBottom: '1px solid var(--primary)', paddingBottom: '0.25rem', fontWeight: 600, fontSize: '0.875rem', textTransform: 'uppercase', letterSpacing: '0.1em' }}>View The Gallery</Link>
        </div>
        
        {loading ? (
          <div style={{ padding: '4rem', textAlign: 'center', color: 'var(--text-muted)' }}>Curating pieces...</div>
        ) : (
          <div className="grid lg:grid-cols-4 md:grid-cols-2 grid-cols-1">
            {featured.map(product => <ProductCard key={product.id} product={product} />)}
          </div>
        )}
      </div>
    </div>
  );
};

export default Home;
