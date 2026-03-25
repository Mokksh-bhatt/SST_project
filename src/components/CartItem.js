import React from 'react';
import { FiTrash2, FiMinus, FiPlus } from 'react-icons/fi';
import { useCart } from '../context/CartContext';
import { Link } from 'react-router-dom';

const CartItem = ({ item }) => {
  const { removeFromCart, updateQuantity } = useCart();
  const { product, quantity } = item;

  return (
    <div className="card" style={{ display: 'flex', gap: '1.5rem', padding: '1.5rem', flexDirection: 'row', alignItems: 'center' }}>
      <div style={{ width: '120px', height: '120px', flexShrink: 0, padding: '0.5rem', background: '#fff', borderRadius: '0.5rem', border: '1px solid var(--border)' }}>
        <Link to={`/products/${product.id}`}>
            <img src={product.image} alt={product.title} style={{ width: '100%', height: '100%', objectFit: 'contain' }} />
        </Link>
      </div>
      
      <div style={{ flex: 1 }}>
        <Link to={`/products/${product.id}`}>
            <h4 style={{ fontSize: '1.25rem', marginBottom: '0.25rem', display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>{product.title}</h4>
        </Link>
        <span style={{ color: 'var(--text-muted)', textTransform: 'capitalize' }}>{product.category}</span>
        <div style={{ fontSize: '1.25rem', fontWeight: 800, marginTop: '0.75rem', color: 'var(--primary)' }}>${(product.price * quantity).toFixed(2)}</div>
        {quantity > 1 && <div style={{ fontSize: '0.875rem', color: 'var(--text-muted)' }}>${product.price.toFixed(2)} each</div>}
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: '1rem', height: '100%', justifyContent: 'space-between' }}>
        <button 
          onClick={() => removeFromCart(product.id)}
          style={{ background: 'none', border: 'none', color: 'var(--danger)', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '0.25rem', fontWeight: 600, padding: '0.5rem', borderRadius: '0.25rem' }}
          onMouseOver={e => e.currentTarget.style.backgroundColor = 'var(--background)'}
          onMouseOut={e => e.currentTarget.style.backgroundColor = 'transparent'}
        >
          <FiTrash2 /> Remove
        </button>
        
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', background: 'var(--background)', borderRadius: 'var(--radius-md)', padding: '0.25rem', border: '1px solid var(--border)' }}>
          <button 
            onClick={() => updateQuantity(product.id, quantity - 1)}
            disabled={quantity <= 1}
            style={{ width: '36px', height: '36px', display: 'flex', alignItems: 'center', justifyContent: 'center', border: 'none', background: 'var(--surface)', borderRadius: '0.25rem', cursor: 'pointer', boxShadow: 'var(--shadow-sm)' }}
          >
            <FiMinus />
          </button>
          <span style={{ fontWeight: 600, minWidth: '24px', textAlign: 'center' }}>{quantity}</span>
          <button 
            onClick={() => updateQuantity(product.id, quantity + 1)}
            style={{ width: '36px', height: '36px', display: 'flex', alignItems: 'center', justifyContent: 'center', border: 'none', background: 'var(--surface)', borderRadius: '0.25rem', cursor: 'pointer', boxShadow: 'var(--shadow-sm)' }}
          >
            <FiPlus />
          </button>
        </div>
      </div>
    </div>
  );
};

export default CartItem;
