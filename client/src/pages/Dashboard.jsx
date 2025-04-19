import React from 'react';
import './Dashboard.css';

const Dashboard = () => {
  return (
    <div className="dashboard-container">
      <section className="intro-section fade-in">
        <h1>Welcome to <span className="highlight">EcoShop</span> 🌿</h1>
        <h2 className="animated-headline">
  {`Rethink the Way you Buy through AI`.split("").map((char, index) => (
    <span
      key={index}
      style={{
        animationDelay: `${index * 0.05}s`,
        display: char === " " ? "inline-block" : undefined,
        width: char === " " ? "0.4em" : undefined, // optional tweak
      }}
    >
      {char === " " ? "\u00A0" : char}
    </span>
  ))}
</h2>


        <p>Your intelligent shopping assistant focused on sustainability, savings, and smarter choices.</p>
      </section>

      <section className="features-section slide-up">
        <div className="feature-card">
          <h2>📊 Smart Insights</h2>
          <p>Analyze your shopping behavior, track expenses, and identify eco-friendly habits.</p>
        </div>
        <div className="feature-card">
          <h2>🔄 Receipt Scanner</h2>
          <p>Upload receipts and get instant analysis—carbon footprint, nutrition, and more.</p>
        </div>
        <div className="feature-card">
          <h2>🌍 Eco Recommendations</h2>
          <p>Get personalized, sustainable product suggestions based on your shopping patterns.</p>
        </div>
        <div className="feature-card">
          <h2>💸 Budget & Waste Control</h2>
          <p>Set spending limits and get waste reduction alerts to shop smarter and greener.</p>
        </div>
      </section>

      <section className="why-section fade-in-delay">
  <h2>Why EcoShop?</h2>
  <div className="why-cards">
    <div className="why-card">
      <span>✅ Conscious Consumerism</span>
      <p>Encourages mindful shopping and eco-responsible habits with personalized insights.</p>
    </div>
    <div className="why-card">
      <span>♻️ Waste Reduction</span>
      <p>Reduces food and packaging waste by tracking consumption and giving smart alerts.</p>
    </div>
    <div className="why-card">
      <span>💰 Budget-Friendly</span>
      <p>Helps you stay within your budget while making smarter, sustainable purchases.</p>
    </div>
    <div className="why-card">
      <span>📈 Real Impact</span>
      <p>Tracks your carbon footprint savings and sustainability goals with real data.</p>
    </div>
    <div className="why-card">
      <span>🌿 Eco Empowerment</span>
      <p>Empowers users to make greener choices without compromising convenience or cost.</p>
    </div>
  </div>
</section>


      <section className="cta-section zoom-in">
        <h2>Ready to shop smarter and greener?</h2>
        <button className="start-btn">🌱 Get Started with EcoShop</button>
      </section>
    </div>
  );
};

export default Dashboard;
