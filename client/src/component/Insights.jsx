import React, { useState } from 'react';
import './Insights.css';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ResponsiveContainer,
} from 'recharts';

const Insights = () => {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedWaste, setSelectedWaste] = useState('All');

  const monthlyData = [
    { month: 'Jan', spend: 320.45, ecoScore: 72, category: 'Produce', wasteLevel: 'Low Waste' },
    { month: 'Feb', spend: 345.2, ecoScore: 74, category: 'Meat', wasteLevel: 'Medium Waste' },
    { month: 'Mar', spend: 389.75, ecoScore: 76, category: 'Bakery', wasteLevel: 'High Waste' },
    { month: 'Apr', spend: 346.75, ecoScore: 82, category: 'Dairy', wasteLevel: 'Low Waste' },
  ];

  const filteredData = monthlyData.filter(item => {
    const categoryMatch = selectedCategory === 'All' || item.category === selectedCategory;
    const wasteMatch = selectedWaste === 'All' || item.wasteLevel === selectedWaste;
    return categoryMatch && wasteMatch;
  });

  return (
    <div className="insights-container">
      <h1>Shopping Insights</h1>
      <p className="last-updated">
  Last updated: {new Date().toLocaleString(undefined, {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: 'numeric',
    minute: '2-digit',
  })}
</p>


      <div className="filters-section">
        <div className="filter-group">
          <label>Filter by Category:</label>
          <select value={selectedCategory} onChange={(e) => setSelectedCategory(e.target.value)}>
            <option>All</option>
            <option>Produce</option>
            <option>Dairy</option>
            <option>Meat</option>
            <option>Bakery</option>
          </select>
        </div>

        <div className="filter-group">
          <label>Filter by Waste Level:</label>
          <select value={selectedWaste} onChange={(e) => setSelectedWaste(e.target.value)}>
            <option>All</option>
            <option>Low Waste</option>
            <option>Medium Waste</option>
            <option>High Waste</option>
          </select>
        </div>
      </div>

      <div className="chart-section">
        <h2>Monthly Spending Trends</h2>
        <p>Track your grocery spending patterns over time</p>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={filteredData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="month" />
            <YAxis />
            <Tooltip />
            <Bar dataKey="spend" fill="#4caf50" />
          </BarChart>
        </ResponsiveContainer>
      </div>

      <div className="spending-summary">
        <h2>Spending Summary</h2>
        <div className="summary-cards">
          <div className="summary-card">
            <h3>Monthly Average</h3>
            <p>$350.54</p>
            <span>📊 5.2% vs last 3 months</span>
          </div>
          <div className="summary-card">
            <h3>Annual Projection</h3>
            <p>$4,206.48</p>
            <span>💡 $260 savings potential</span>
          </div>
        </div>
      </div>

      <div className="monthly-history">
        <h2>Monthly History</h2>
        {filteredData.map((item) => (
          <div key={item.month} className="month-card">
            <h3>{item.month} 2025</h3>
            <p>Spent: ${item.spend.toFixed(2)}</p>
            <p>EcoScore: {item.ecoScore}</p>
            <p>Category: {item.category}</p>
            <p>Waste Level: {item.wasteLevel}</p>
          </div>
        ))}
      </div>

      <div className="savings-opportunities">
        <h2>Cost-Saving Opportunities</h2>
        <p>💰 You could save <strong>$65.50</strong> on your monthly grocery bill by following our recommendations.</p>
        <ul>
          <li><strong>Organic Produce:</strong> Select seasonal options – $18.25/mo</li>
          <li><strong>Bulk Purchases:</strong> For non-perishable items – $15.75/mo</li>
          <li><strong>Store Brands:</strong> For equivalent quality items – $12.50/mo</li>
          <li><strong>Reduce Waste:</strong> Better inventory management – $19.00/mo</li>
        </ul>
      </div>
    </div>
  );
};

export default Insights;