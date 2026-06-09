# CustomerVista: AI-Powered Customer Intelligence Platform

## Overview

CustomerVista is an end-to-end customer intelligence platform designed to help businesses understand customer behavior, predict churn, identify high-value customers, forecast future revenue, and generate product recommendations.

The platform combines machine learning, business intelligence, backend engineering, database management, and interactive dashboards into a single analytics solution.

CustomerVista provides a complete 360-degree view of customers through customer segmentation, churn prediction, customer lifetime value analysis, sales forecasting, and recommendation systems.

---

## Key Features

### Customer Segmentation

* RFM (Recency, Frequency, Monetary) Analysis
* K-Means Clustering
* Customer grouping into:

  * Dormant Customers
  * Regular Customers
  * Loyal Customers
  * High-Value Customers
  * VIP Customers

### Churn Prediction

* Logistic Regression Model
* Churn probability scoring
* High-risk customer identification

### Customer Lifetime Value (CLV) Analysis

* Lifespan calculation
* CLV segmentation
* Customer value categorization

### Revenue Forecasting

* Monthly revenue trend analysis
* Exponential Smoothing forecasting model
* Future revenue estimation

### Product Recommendation Engine

* Market Basket Analysis
* Apriori Algorithm
* Association Rules
* Product affinity insights

### Interactive Dashboard

* Executive Overview Dashboard
* Customer Intelligence Dashboard
* Product Intelligence Dashboard
* Forecasting Dashboard

---

## Technology Stack

### Data Science & Machine Learning

* Python
* Pandas
* NumPy
* Scikit-learn
* Statsmodels
* Mlxtend

### Database

* PostgreSQL
* SQLAlchemy

### Backend

* FastAPI
* Pydantic

### Frontend

* React
* Axios
* Recharts

### Deployment

* Docker
* Render
* Vercel
* Supabase

---

## Machine Learning Models

| Module                  | Algorithm                   |
| ----------------------- | --------------------------- |
| Customer Segmentation   | K-Means Clustering          |
| Churn Prediction        | Logistic Regression         |
| Customer Lifetime Value | K-Means Clustering          |
| Revenue Forecasting     | Exponential Smoothing       |
| Product Recommendations | Apriori + Association Rules |

---

## System Architecture

Raw Retail Dataset

↓

Data Cleaning & Feature Engineering

↓

Machine Learning Models

├── Customer Segmentation

├── Churn Prediction

├── CLV Analysis

├── Revenue Forecasting

└── Recommendation Engine

↓

PostgreSQL Database

↓

FastAPI Backend

↓

React Dashboard

---

## Database Schema

### customers

* customer_id
* frequency
* monetary
* lifespan
* segment
* churn_probability
* clv_tier

### products

* stock_code
* description

### transactions

* invoice_no
* customer_id
* invoice_date

### transaction_items

* id
* invoice_no
* stock_code
* quantity
* unit_price
* total_price

### recommendations

* product_a
* product_b
* support
* confidence
* lift

### sales_forecasts

* forecast_month
* predicted_revenue
* model_name

---

## API Endpoints

### Dashboard

GET /dashboard/summary

Returns:

* Total Revenue
* Total Customers
* Total Orders

### Customers

GET /customers/segments

GET /customers/churn

GET /customers/clv

### Products

GET /products/top

GET /products/recommendations

GET /products/pairs

### Forecast

GET /forecast/revenue

---

## Dashboard Modules

### Executive Dashboard

Provides a high-level business overview including:

* Revenue KPIs
* Customer KPIs
* Order KPIs

### Customer Intelligence

Provides:

* Customer Segmentation
* Churn Analysis
* CLV Distribution

### Product Intelligence

Provides:

* Top Products
* Product Recommendations
* Product Pair Insights

### Forecasting

Provides:

* Historical Revenue Trends
* Future Revenue Forecasts

---

## Business Insights Generated

### Customer Insights

* Identify high-value customers
* Detect customers likely to churn
* Prioritize retention strategies
* Understand customer value distribution

### Product Insights

* Identify top-selling products
* Discover products frequently purchased together
* Generate recommendation opportunities

### Revenue Insights

* Understand revenue seasonality
* Forecast future business performance
* Support strategic planning

---

## Installation

### Backend

```bash
cd backend

pip install -r requirements.txt

uvicorn app.main:app --reload
```

### Frontend

```bash
cd frontend

npm install

npm run dev
```

---


