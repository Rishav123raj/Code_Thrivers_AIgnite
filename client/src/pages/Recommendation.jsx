import React, { useState } from 'react';
import './Dashboard.css';
import './Recommendation.css';

const recommendations = [
  {
    category: 'Vegetables',
    name: 'Organic Spinach',
    price: 3.99,
    ecoscore: 92,
    alternatives: [
      { name: 'Local Farm Spinach', ecoscore: 95, price: 3.49, savings: 0.50 },
      { name: 'Frozen Spinach', ecoscore: 75, price: 2.99, savings: 1.00 }
    ]
  },
  {
    category: 'Meat',
    name: 'Chicken Breast (Organic)',
    price: 12.99,
    ecoscore: 75,
    alternatives: [
      { name: 'Local Farm Chicken', ecoscore: 85, price: 11.99, savings: 1.00 },
      { name: 'Chicken Thighs', ecoscore: 80, price: 9.99, savings: 3.00 }
    ]
  },
  {
    category: 'Dairy Alternatives',
    name: 'Almond Milk',
    price: 4.29,
    ecoscore: 65,
    alternatives: [
      { name: 'Oat Milk', ecoscore: 85, price: 4.49, savings: 0 },
      { name: 'Soy Milk', ecoscore: 75, price: 3.99, savings: 0.30 }
    ]
  },
  {
    category: 'Bakery',
    name: 'White Bread',
    price: 3.49,
    ecoscore: 55,
    alternatives: [
      { name: 'Whole Wheat Bread', ecoscore: 80, price: 3.99, savings: 0 },
      { name: 'Sourdough Bread', ecoscore: 75, price: 4.49, savings: 0 }
    ]
  },
  {
    category: 'Beverages',
    name: 'Bottled Water (12-pack)',
    price: 5.99,
    ecoscore: 25,
    alternatives: [
      { name: 'Reusable Water Bottle', ecoscore: 95, price: 15.99, savings: 0 },
      { name: 'Water Filter', ecoscore: 90, price: 25.99, savings: 0 }
    ]
  }
];

const Recommendation = () => {
  const [categoryFilter, setCategoryFilter] = useState('All');
  const [sortBy, setSortBy] = useState('EcoScore');

  const filtered = recommendations.filter(item => categoryFilter === 'All' || item.category === categoryFilter);

  const sorted = [...filtered].sort((a, b) => {
    if (sortBy === 'EcoScore') return b.ecoscore - a.ecoscore;
    if (sortBy === 'Price') return a.price - b.price;
    if (sortBy === 'Savings') return Math.max(...b.alternatives.map(x => x.savings || 0)) - Math.max(...a.alternatives.map(x => x.savings || 0));
    return 0;
  });

  const categories = ['All', 'Vegetables', 'Dairy Alternatives', 'Meat', 'Bakery', 'Beverages'];

  return (
    <div className="dashboard-container fade-in">
      <section className="intro-section">
        <h1>Smart Recommendations</h1>
        <p>Personalized recommendations based on your shopping habits and sustainability goals.</p>
        <p className="subtext">Updated weekly based on your shopping data and seasonal availability.</p>

        <div className="filters">
          <div className="filter-group">
            <label>Filter by Category:</label>
            <select onChange={e => setCategoryFilter(e.target.value)} value={categoryFilter}>
              {categories.map(cat => (
                <option key={cat}>{cat}</option>
              ))}
            </select>
          </div>

          <div className="filter-group">
            <label>Sort By:</label>
            <select onChange={e => setSortBy(e.target.value)} value={sortBy}>
              <option value="EcoScore">EcoScore</option>
              <option value="Savings">Savings</option>
              <option value="Price">Price</option>
            </select>
          </div>
        </div>
      </section>

      <section className="recommendations-section">
        {sorted.map((item, idx) => (
          <div className="recommendation-card" key={idx}>
            <div className="recommendation-header">
              <h2>{item.name}</h2>
              <span className="ecoscore-tag">EcoScore: {item.ecoscore}</span>
              <p>${item.price.toFixed(2)}</p>
            </div>
            <p className="save-tip">Save up to ${Math.max(...item.alternatives.map(alt => alt.savings || 0)).toFixed(2)} with alternatives</p>

            <div className="alternatives">
              {item.alternatives.map((alt, i) => (
                <div className="alt-item" key={i}>
                  <p><strong>{alt.name}</strong></p>
                  <span>EcoScore: {alt.ecoscore}</span>
                  <p>${alt.price.toFixed(2)} {alt.savings > 0 && <span className="savings">(Save ${alt.savings})</span>}</p>
                </div>
              ))}
            </div>

            <button className="add-btn">➕ Add to Shopping List</button>
          </div>
        ))}
      </section>
    </div>
  );
};

export default Recommendation;