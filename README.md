# EcoFinex-AI-Driven-ESG-Assessment-and-Optimization

# EcoFinex 🌱

**EcoFinex** is an AI-powered investment navigation system that helps banks and institutions evaluate companies based on Environmental, Social, and Governance (ESG) criteria. Using four machine learning models—NLP, sentiment analysis, supervised learning, and reinforcement learning—EcoFinex assists in making sustainable, data-backed investment decisions.

---

## 🔍 Key Features

- **NLP-based Company Insights**: Extracts ongoing green projects from web sources using company names.
- **Sentiment Analysis**: Visualizes public and market sentiment scores using bar charts.
- **Supervised Learning**: Predicts a company’s ESG viability based on factors like:
  - ESG Score
  - Predicted Future ESG Score
  - ESG Risk Exposure & Management
  - Controversy Level & Score
- **Reinforcement Learning**: Recommends optimal investment strategies using dynamic policy simulation.
- **Custom Threshold Settings**: Users can adjust investment thresholds and toggle auto-investment strategies.

---

## 🧠 Tech Stack

- **Frontend**: React + Tailwind CSS + ShadCN UI
- **Backend APIs**: Node.js/Express or Python (FastAPI/Flask) to connect ML models
- **Database**: Supabase (PostgreSQL)
- **ML Models**:
  - NLP (using spaCy / Transformers)
  - Sentiment Analysis (preprocessed sentiment dataset)
  - Supervised Learning (Logistic Regression / Random Forest)
 
---

## 📂 Folder Structure

```bash
eco-invest-navigator/
│
├── components/         # UI components
├── pages/              # Main dashboard + API endpoints
├── lib/supabase.js     # Supabase client
├── public/             # Assets
├── styles/             # CSS / Tailwind config
├── models/             # ML model logic (Python/JS)
└── .vscode/            # IDE configuration
