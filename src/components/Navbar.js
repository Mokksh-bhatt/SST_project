import React from 'react';
import { Link } from 'react-router-dom';
import { FiShoppingCart, FiHeart } from 'react-icons/fi';
import { useCart } from '../context/CartContext';
import { useWishlist } from '../context/WishlistContext';

const Navbar = () => {
  const { cartCount } = useCart();
  const { wishlistItems } = useWishlist();

  return (
    <nav style={{ padding: '1rem 2rem', background: 'rgba(255,255,255,0.8)', backdropFilter: 'blur(10px)', borderBottom: '1px solid var(--border)', display: 'flex', justifyContent: 'space-between', alignItems: 'center', position: 'sticky', top: 0, zIndex: 50 }}>
      <Link to="/" style={{ fontSize: '1.5rem', fontWeight: 800, color: 'var(--primary)', letterSpacing: '-0.02em' }}>ShopEZ.</Link>
      
      <div style={{ display: 'flex', gap: '2rem', alignItems: 'center' }}>
        <Link to="/products" style={{ fontWeight: 500, transition: 'color 0.2s' }} onMouseOver={e => e.target.style.color='var(--primary)'} onMouseOut={e => e.target.style.color='inherit'}>Explore</Link>
        <Link to="/wishlist" style={{ position: 'relative', color: 'var(--text-muted)' }} onMouseOver={e => e.target.style.color='var(--danger)'} onMouseOut={e => e.target.style.color='var(--text-muted)'}>
          <FiHeart size={24} />
          {wishlistItems.length > 0 && (
            <span style={{ position: 'absolute', top: '-8px', right: '-12px', background: 'var(--danger)', color: 'white', fontSize: '0.75rem', borderRadius: '999px', padding: '0 6px', fontWeight: 'bold' }}>
              {wishlistItems.length}
            </span>
          )}
        </Link>
        <Link to="/cart" style={{ position: 'relative', color: 'var(--text-muted)' }} onMouseOver={e => e.target.style.color='var(--primary)'} onMouseOut={e => e.target.style.color='var(--text-muted)'}>
          <FiShoppingCart size={24} />
          {cartCount > 0 && (
            <span style={{ position: 'absolute', top: '-8px', right: '-12px', background: 'var(--primary)', color: 'white', fontSize: '0.75rem', borderRadius: '999px', padding: '0 6px', fontWeight: 'bold' }}>
              {cartCount}
            </span>
          )}
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;
