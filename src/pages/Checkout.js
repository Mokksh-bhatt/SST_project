import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { useCart } from '../context/CartContext';
import { toast } from 'react-toastify';
import { motion } from 'framer-motion';

const schema = yup.object({
  firstName: yup.string().required('First name is required'),
  lastName: yup.string().required('Last name is required'),
  email: yup.string().email('Invalid email address').required('Email is required'),
  address: yup.string().required('Address is required'),
  city: yup.string().required('City is required'),
  zip: yup.string().required('ZIP Code is required'),
  cardNumber: yup.string().matches(/^\d{16}$/, 'Card number must be 16 digits').required('Card number is required'),
  expiry: yup.string().matches(/^(0[1-9]|1[0-2])\/\d{2}$/, 'Invalid format (MM/YY)').required('Required'),
  cvv: yup.string().matches(/^\d{3,4}$/, 'Invalid CVV').required('Required'),
}).required();

const Checkout = () => {
  const { cartItems, cartTotal, clearCart } = useCart();
  const navigate = useNavigate();
  const [isProcessing, setIsProcessing] = useState(false);

  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: yupResolver(schema)
  });

  if (cartItems.length === 0) {
    navigate('/cart');
    return null;
  }

  const tax = cartTotal * 0.08;
  const finalTotal = cartTotal + tax;

  const onSubmit = (data) => {
    setIsProcessing(true);
    // Simulate API call
    setTimeout(() => {
      setIsProcessing(false);
      clearCart();
      toast.success('🎉 Order placed successfully!', {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
      });
      navigate('/');
    }, 2000);
  };

  const InputField = ({ label, name, type = 'text', placeholder }) => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', marginBottom: '1rem' }}>
      <label style={{ fontSize: '0.875rem', fontWeight: 600, color: 'var(--text-main)' }}>{label}</label>
      <input 
        type={type} 
        {...register(name)} 
        placeholder={placeholder}
        className="input"
        style={{ borderColor: errors[name] ? 'var(--danger)' : 'var(--border)' }}
      />
      {errors[name] && <span style={{ color: 'var(--danger)', fontSize: '0.75rem' }}>{errors[name].message}</span>}
    </div>
  );

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
      <h1 style={{ marginBottom: '2rem' }}>Checkout</h1>
      
      <div style={{ display: 'flex', gap: '2rem', alignItems: 'flex-start', flexWrap: 'wrap' }}>
        <div className="card" style={{ flex: '1 1 600px', padding: '2rem' }}>
          <h3 style={{ marginBottom: '1.5rem', paddingBottom: '1rem', borderBottom: '1px solid var(--border)' }}>Shipping Information</h3>
          
          <form id="checkout-form" onSubmit={handleSubmit(onSubmit)}>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
              <InputField label="First Name" name="firstName" placeholder="John" />
              <InputField label="Last Name" name="lastName" placeholder="Doe" />
            </div>
            
            <InputField label="Email Address" name="email" type="email" placeholder="john@example.com" />
            <InputField label="Street Address" name="address" placeholder="123 Shopping Blvd" />
            
            <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '1rem' }}>
              <InputField label="City" name="city" placeholder="New York" />
              <InputField label="ZIP Code" name="zip" placeholder="10001" />
            </div>

            <h3 style={{ margin: '2rem 0 1.5rem', paddingBottom: '1rem', borderBottom: '1px solid var(--border)' }}>Payment Details</h3>
            
            <InputField label="Card Number" name="cardNumber" placeholder="0000 0000 0000 0000" />
            
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
              <InputField label="Expiry Date (MM/YY)" name="expiry" placeholder="12/26" />
              <InputField label="CVV" name="cvv" placeholder="123" />
            </div>
          </form>
        </div>

        <div className="card" style={{ flex: '1 1 350px', padding: '2rem', position: 'sticky', top: '100px', background: '#f8fafc' }}>
          <h3 style={{ borderBottom: '1px solid var(--border)', paddingBottom: '1rem', marginBottom: '1.5rem' }}>Order Summary</h3>
          
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', marginBottom: '1.5rem' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <span style={{ color: 'var(--text-muted)' }}>Items ({cartItems.length})</span>
              <span style={{ fontWeight: 600 }}>${cartTotal.toFixed(2)}</span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <span style={{ color: 'var(--text-muted)' }}>Estimated Tax</span>
              <span style={{ fontWeight: 600 }}>${tax.toFixed(2)}</span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <span style={{ color: 'var(--text-muted)' }}>Shipping</span>
              <span style={{ fontWeight: 600, color: 'var(--secondary)' }}>Free</span>
            </div>
          </div>
          
          <div style={{ borderTop: '1px solid var(--border)', paddingTop: '1.5rem', marginBottom: '2rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <span style={{ fontSize: '1.25rem', fontWeight: 700 }}>Total</span>
            <span style={{ fontSize: '1.5rem', fontWeight: 800, color: 'var(--primary)' }}>${finalTotal.toFixed(2)}</span>
          </div>

          <button 
            type="submit"
            form="checkout-form"
            className="btn btn-primary" 
            style={{ width: '100%', padding: '1rem', fontSize: '1.125rem', justifyContent: 'center' }}
            disabled={isProcessing}
          >
            {isProcessing ? 'Processing Order...' : `Pay $${finalTotal.toFixed(2)}`}
          </button>
        </div>
      </div>
    </motion.div>
  );
};

export default Checkout;
