import React from 'react';
import { Link } from 'react-router-dom';
import { FiHeart, FiShoppingCart } from 'react-icons/fi';
import { useCart } from '../context/CartContext';
import { useWishlist } from '../context/WishlistContext';
import { motion } from 'framer-motion';

const ProductCard = ({ product }) => {
  const { addToCart } = useCart();
  const { toggleWishlist, isInWishlist } = useWishlist();
  const liked = isInWishlist(product.id);

  return (
    <motion.div 
      className="card"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ y: -5, boxShadow: '0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 8px 10px -6px rgba(0, 0, 0, 0.1)' }}
      transition={{ duration: 0.3 }}
      style={{ display: 'flex', flexDirection: 'column', height: '100%' }}
    >
      <div style={{ position: 'relative', padding: '2rem', background: '#fff', display: 'flex', justifyContent: 'center', alignItems: 'center', height: '220px' }}>
        <button 
          onClick={(e) => { e.preventDefault(); toggleWishlist(product); }}
          style={{ position: 'absolute', top: '1rem', right: '1rem', background: 'rgba(255,255,255,0.8)', backdropFilter:'blur(4px)', padding:'0.5rem', borderRadius:'50%', border: '1px solid var(--border)', cursor: 'pointer', color: liked ? 'var(--danger)' : 'var(--text-muted)', display:'flex', alignItems:'center', justifyContent:'center', transition: 'all 0.2s' }}
        >
          <FiHeart size={20} fill={liked ? 'currentColor' : 'none'} />
        </button>
        <Link to={`/products/${product.id}`} style={{ width: '100%', height:'100%', display:'flex', justifyContent:'center' }}>
            <img src={product.image} alt={product.title} style={{ maxHeight: '100%', maxWidth: '100%', objectFit: 'contain', transition: 'transform 0.3s' }} onMouseOver={e => e.currentTarget.style.transform='scale(1.05)'} onMouseOut={e => e.currentTarget.style.transform='scale(1)'}/>
        </Link>
      </div>
      
      <div style={{ padding: '1.5rem', display: 'flex', flexDirection: 'column', flex: 1, borderTop: '1px solid var(--border)' }}>
        <span style={{ fontSize: '0.75rem', textTransform: 'uppercase', color: 'var(--text-muted)', fontWeight: 600, letterSpacing: '0.05em', marginBottom: '0.5rem' }}>{product.category}</span>
        <Link to={`/products/${product.id}`} style={{ flex: 1 }}>
          <h3 style={{ fontSize: '1.125rem', marginBottom: '0.5rem', display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>{product.title}</h3>
        </Link>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1rem' }}>
          <span style={{ color: '#fbbf24' }}>★</span>
          <span style={{ fontWeight: 600 }}>{product.rating?.rate}</span>
          <span style={{ color: 'var(--text-muted)', fontSize: '0.875rem' }}>({product.rating?.count})</span>
        </div>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: 'auto' }}>
          <span style={{ fontSize: '1.25rem', fontWeight: 800 }}>${product.price.toFixed(2)}</span>
          <button 
            onClick={(e) => { e.preventDefault(); addToCart(product); }} 
            className="btn btn-primary"
            style={{ padding: '0.75rem', borderRadius: '50%' }}
            title="Add to Cart"
          >
            <FiShoppingCart size={20} />
          </button>
        </div>
      </div>
    </motion.div>
  );
};

export default ProductCard;
