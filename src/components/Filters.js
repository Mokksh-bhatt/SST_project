import React from 'react';

const Filters = ({ categories, activeCategory, setActiveCategory, sortConfig, setSortConfig }) => {
  return (
    <div className="card" style={{ padding: '1.5rem', height: 'fit-content', position: 'sticky', top: '100px' }}>
      <h3 style={{ marginBottom: '1.5rem', fontSize: '1.25rem', borderBottom: '1px solid var(--border)', paddingBottom: '0.5rem' }}>Filters</h3>
      
      <div style={{ marginBottom: '2rem' }}>
        <h4 style={{ fontSize: '1rem', marginBottom: '1rem' }}>Category</h4>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
          {categories.map(cat => (
            <label key={cat} style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', cursor: 'pointer', textTransform: 'capitalize' }}>
              <input 
                type="radio" 
                name="category" 
                value={cat} 
                checked={activeCategory === cat}
                onChange={() => setActiveCategory(cat)}
                style={{ accentColor: 'var(--primary)', width: '18px', height: '18px', cursor: 'pointer' }}
              />
              <span style={{ color: activeCategory === cat ? 'var(--primary)' : 'var(--text-main)', fontWeight: activeCategory === cat ? 600 : 400 }}>
                {cat === 'all' ? 'All Products' : cat}
              </span>
            </label>
          ))}
        </div>
      </div>

      <div>
        <h4 style={{ fontSize: '1rem', marginBottom: '1rem' }}>Sort By</h4>
        <select 
          className="input" 
          value={sortConfig} 
          onChange={(e) => setSortConfig(e.target.value)}
          style={{ cursor: 'pointer', background: 'var(--background)' }}
        >
          <option value="default">Recommended</option>
          <option value="price-asc">Price: Low to High</option>
          <option value="price-desc">Price: High to Low</option>
          <option value="rating">Top Rated</option>
        </select>
      </div>
    </div>
  );
};

export default Filters;
