# 🛒 EcoShop – Rethink the Way you Buy through AI

Welcome to **EcoShop**, an innovative solution designed to revolutionize your shopping habits while promoting **financial savings** and **environmental sustainability**. Powered by **Generative AI** and **Machine Learning**, SmartCart AI is your personalized assistant for smarter, waste-free shopping.

---

## 📌 Problem Statement

Shopping in the digital age is convenient, yet riddled with issues such as:

- ✅ **Over-purchasing** leading to food and product waste  
- ❌ Difficulty in finding **best deals or sustainable alternatives**  
- 🤯 Lack of **personalized shopping insights**  
- 🏬 Retailers struggle with **inventory management** and **customer engagement**

Traditional systems lack personalization, sustainability, and smart decision-making, contributing to financial and environmental strain.

---

## 💡 Solution Overview

**EcoShop** empowers users and businesses to shop intelligently by:

- 🔍 Recommending optimal product quantities based on preferences and history
- 💰 Suggesting **budget-friendly and sustainable alternatives**
- ⏰ Sending alerts for **expiring groceries** to reduce waste
- 📷 Using **receipt scanning** for AI-based analysis of purchase habits
- 🛍️ Comparing prices across **multiple e-commerce platforms**
- 🔗 Seamlessly integrating with **smart devices and online retailers**

---

## 🚀 MVP Features

Here’s what the **Minimum Viable Product (MVP)** includes:

### 1. 👤 User Profile Setup
- Define personal shopping habits, dietary preferences, and monthly budget
- Adaptive profiling using AI to learn from interactions over time

### 2. 🧠 Smart Recommendation Engine
- AI-generated shopping lists based on past behavior and current needs
- Suggests exact **quantities** to avoid over-purchasing

### 3. 💸 Cross-Platform Price Comparison
- Real-time price tracking across major online stores
- Shows **best deals**, **bulk discounts**, and **eco-friendly alternatives**

### 4. ⏳ Expiry Alert System
- Tracks perishable items from receipt data
- Sends timely notifications before products expire

### 5. 📄 Receipt Scanning & Analysis
- Use OCR and computer vision to extract data from uploaded receipts
- Helps refine future recommendations by analyzing past purchases

---

## 🧰 Tech Stack

| Technology | Description |
|------------|-------------|
| **React.js** | Frontend for seamless user interaction |
| **Node.js + Express** | Backend server and API handling |
| **MongoDB** | NoSQL database for user data & receipts |
| **TensorFlow / PyTorch** | For ML model development and recommendation engine |
| **OCR (Tesseract / OCR.Space API)** | For extracting data from receipts |
| **Firebase / Twilio** | For sending expiry alerts |

---

## 📦 Repository Structure

```bash
smartcart-ai/
├── client/                 # React Frontend
├── server/                 # Express Backend
│   ├── controllers/
│   ├── routes/
│   ├── models/
│   └── utils/
├── ml-model/               # AI Recommendation System
├── assets/                 # UI assets & receipt samples
├── README.md
└── .env.example            # Environment variable template
```

## ⚙️ Installation & Setup

# Clone the repository
git clone https://github.com/Rishav123raj/Code_Thrivers_AIgnite.git
cd Code_Thrivers_AIgnite

# Setup backend
cd server
npm install
npm run dev

# Setup frontend
cd ../client
npm install
npm start

🛠️ Ensure MongoDB and environment variables are properly configured.

🛤️ Roadmap
 MVP with core features

 Advanced receipt parsing with NLP

 Integration with Alexa/Google Assistant

 Gamification & reward system for sustainable shopping

 Multi-user household support

 Inventory prediction for businesses

## 🤝 Contributing
We welcome contributions! Please follow these steps:

Fork the repo

Create a feature branch (git checkout -b feature-name)

Commit your changes (git commit -m "Add feature")

Push to the branch (git push origin feature-name)

Create a Pull Request ✅

## 👨‍💻 Authors
Made with AI by Code_Thrivers
