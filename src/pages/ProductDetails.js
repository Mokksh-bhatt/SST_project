import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { getProductById } from '../services/api';
import { useCart } from '../context/CartContext';
import { useWishlist } from '../context/WishlistContext';
import { FiShoppingCart, FiHeart, FiArrowLeft } from 'react-icons/fi';
import { motion } from 'framer-motion';

const ProductDetails = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const { addToCart } = useCart();
  const { toggleWishlist, isInWishlist } = useWishlist();

  useEffect(() => {
    setLoading(true);
    getProductById(id)
      .then(res => {
          // ensure rating block
          res.data.rating = res.data.rating || { rate: 4.5, count: 120 };
          setProduct(res.data);
      })
      .catch(console.error)
      .finally(() => setLoading(false));
  }, [id]);

  if (loading) return <div style={{ padding: '8rem', textAlign: 'center', color: 'var(--text-muted)' }}>Loading details...</div>;
  if (!product) return <div style={{ padding: '8rem', textAlign: 'center' }}>Product not found.</div>;

  const liked = isInWishlist(product.id);

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
      <Link to="/products" style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', color: 'var(--text-muted)', marginBottom: '2rem', fontWeight: 500, transition: 'color 0.2s' }} onMouseOver={e => e.currentTarget.style.color='var(--primary)'} onMouseOut={e => e.currentTarget.style.color='var(--text-muted)'}>
        <FiArrowLeft /> Back to products
      </Link>

      <div className="card" style={{ display: 'flex', flexDirection: 'column' }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '2rem' }}>
          <div style={{ padding: '3rem', background: '#fff', display: 'flex', justifyContent: 'center', alignItems: 'center', borderRight: '1px solid var(--border)' }}>
            <img src={product.image} alt={product.title} style={{ maxWidth: '100%', maxHeight: '400px', objectFit: 'contain' }} />
          </div>
          
          <div style={{ padding: '3rem' }}>
            <span style={{ textTransform: 'uppercase', color: 'var(--primary)', fontWeight: 700, letterSpacing: '0.05em', fontSize: '0.875rem' }}>{product.category}</span>
            <h1 style={{ fontSize: '2.5rem', margin: '0.75rem 0 1.5rem', lineHeight: 1.2 }}>{product.title}</h1>
            
            <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem', marginBottom: '2rem', paddingBottom: '2rem', borderBottom: '1px solid var(--border)' }}>
              <span style={{ fontSize: '2.5rem', fontWeight: 800 }}>${product.price.toFixed(2)}</span>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', background: 'var(--background)', padding: '0.5rem 1rem', borderRadius: '999px' }}>
                <span style={{ color: '#fbbf24', fontSize: '1.25rem' }}>★</span>
                <span style={{ fontWeight: 600, fontSize: '1.125rem' }}>{product.rating?.rate}</span>
                <span style={{ color: 'var(--text-muted)' }}>({product.rating?.count} reviews)</span>
              </div>
            </div>

            <p style={{ fontSize: '1.125rem', lineHeight: 1.8, marginBottom: '2.5rem', color: 'var(--text-muted)' }}>{product.description}</p>

            <div style={{ display: 'flex', gap: '1rem' }}>
              <button 
                onClick={() => addToCart(product)} 
                className="btn btn-primary"
                style={{ flex: 1, padding: '1rem', fontSize: '1.125rem', justifyContent: 'center' }}
              >
                <FiShoppingCart size={20} /> Add to Cart
              </button>
              <button 
                onClick={() => toggleWishlist(product)} 
                className="btn btn-outline"
                style={{ padding: '1rem', width: '64px', color: liked ? 'var(--danger)' : 'var(--text-main)', borderColor: liked ? 'var(--danger)' : 'var(--border)', justifyContent: 'center' }}
              >
                <FiHeart fill={liked ? 'currentColor' : 'none'} size={24} />
              </button>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default ProductDetails;
