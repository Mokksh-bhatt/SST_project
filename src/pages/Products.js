import React, { useState, useMemo } from 'react';
import { useProducts, useCategories } from '../hooks/useProducts';
import { useDebounce } from '../hooks/useDebounce';
import ProductGrid from '../components/ProductGrid';
import ProductCard from '../components/ProductCard';
import SearchBar from '../components/SearchBar';
import Filters from '../components/Filters';
import { motion } from 'framer-motion';

const Products = () => {
  const [activeCategory, setActiveCategory] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [sortConfig, setSortConfig] = useState('default');
  
  const debouncedSearch = useDebounce(searchTerm, 500);
  const { categories } = useCategories();
  const { products, loading, error } = useProducts(activeCategory);

  const filteredAndSortedProducts = useMemo(() => {
    let result = [...products];

    // Search filter
    if (debouncedSearch) {
      result = result.filter(p => p.title.toLowerCase().includes(debouncedSearch.toLowerCase()));
    }

    // Sorting
    switch (sortConfig) {
      case 'price-asc':
        result.sort((a, b) => a.price - b.price);
        break;
      case 'price-desc':
        result.sort((a, b) => b.price - a.price);
        break;
      case 'rating':
        result.sort((a, b) => (b.rating?.rate || 0) - (a.rating?.rate || 0));
        break;
      default:
        break;
    }

    return result;
  }, [products, debouncedSearch, sortConfig]);

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem', flexWrap: 'wrap', gap: '1rem' }}>
        <h1 style={{ marginBottom: 0 }}>Explore Products</h1>
        <SearchBar searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
      </div>

      <div style={{ display: 'flex', gap: '2rem', alignItems: 'flex-start' }}>
        <aside style={{ width: '280px', flexShrink: 0 }}>
          <Filters 
            categories={categories}
            activeCategory={activeCategory}
            setActiveCategory={setActiveCategory}
            sortConfig={sortConfig}
            setSortConfig={setSortConfig}
          />
        </aside>
        
        <div style={{ flex: 1 }}>
          {error && <div style={{ color: 'var(--danger)', padding: '2rem', background: '#fee2e2', borderRadius: 'var(--radius-md)', marginBottom: '1rem' }}>{error}</div>}
          
          {loading ? (
             <div style={{ padding: '8rem', textAlign: 'center', color: 'var(--text-muted)' }}>Loading catalog...</div>
          ) : filteredAndSortedProducts.length === 0 ? (
             <div className="card" style={{ padding: '8rem', textAlign: 'center', color: 'var(--text-muted)' }}>No products match your search. Try different keywords.</div>
          ) : (
            <ProductGrid>
              {filteredAndSortedProducts.map(product => (
                <ProductCard key={product.id} product={product} />
              ))}
            </ProductGrid>
          )}
        </div>
      </div>
    </motion.div>
  );
};

export default Products;
