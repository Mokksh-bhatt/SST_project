import { useState, useEffect } from 'react';
import { getProducts, getCategories, getProductsByCategory } from '../services/api';

export const useProducts = (category = '') => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let isMounted = true;
    const fetchProducts = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = category && category !== 'all' 
          ? await getProductsByCategory(category)
          : await getProducts();
        
        if (isMounted) {
          // Ensure ratings exist from fakestore API format if missing
          const data = response.data.map(p => ({
              ...p,
              rating: p.rating || { rate: (Math.random() * 2 + 3).toFixed(1), count: Math.floor(Math.random() * 500) }
          }));
          setProducts(data);
        }
      } catch (err) {
        if (isMounted) setError(err.message || 'Failed to fetch products');
      } finally {
        if (isMounted) setLoading(false);
      }
    };

    fetchProducts();
    return () => { isMounted = false; };
  }, [category]);

  return { products, loading, error };
};

export const useCategories = () => {
    const [categories, setCategories] = useState([]);
    
    useEffect(() => {
        let isMounted = true;
        getCategories().then(res => {
            if (isMounted) setCategories(['all', ...res.data]);
        }).catch(console.error);
        return () => { isMounted = false; };
    }, []);

    return { categories };
};
