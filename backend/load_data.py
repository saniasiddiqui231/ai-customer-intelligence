import pandas as pd
from datetime import datetime
from app.database.connection import engine

cleaned_df = pd.read_csv("../data/processed/cleaned_retail_data.csv")

products_df = (
    cleaned_df[
        ["StockCode", "Description"]
    ]
    .drop_duplicates(subset=["StockCode"])
)

products_df.columns = [
    "stock_code",
    "description"
]
# print(products_df.info())
# print(products_df.isnull().sum())
# print(products_df.head())
print("Loading products...")
products_df.to_sql(
    "products",
    con=engine,
    if_exists="append",
    index=False
)

# print("Products loaded")

transactions_df = (
    cleaned_df[
        ["Invoice", "Customer ID", "InvoiceDate"]
    ]
    .drop_duplicates(subset=["Invoice"])
)

transactions_df.columns = [
    "invoice_no",
    "customer_id",
    "invoice_date"
]

transactions_df["invoice_date"] = pd.to_datetime(
    transactions_df["invoice_date"]
)
# print(transactions_df.info())
# print(transactions_df.isnull().sum())
print("Loading transactions...")
transactions_df.to_sql(
    "transactions",
    con=engine,
    if_exists="append",
    index=False
)

print("Transactions loaded")

customers_df = pd.read_csv(
    "../data/processed/customer_intelligence.csv"
)

customers_df = customers_df[
    [
        "customer_id",
        "segment",
        "churn_probability",
        "clv_tier",
        "last_updated"
    ]
]


customers_df["last_updated"] = pd.to_datetime(
    customers_df["last_updated"]
)

print("Loading customers...")
customers_df.to_sql(
    name="customers",
    con=engine,
    if_exists="append",
    index=False
)

print("Customers loaded successfully")
transaction_items_df = cleaned_df[
    [
        "Invoice",
        "StockCode",
        "Quantity",
        "Price"
    ]
].copy().drop_duplicates()

transaction_items_df.columns = [
    "invoice_no",
    "stock_code",
    "quantity",
    "unit_price"
]
transaction_items_df.to_sql(
    "transaction_items",
    con=engine,
    if_exists="append",
    index=False
)
print("transaction_items loaded successfully")

recommendations_df = pd.read_csv(
    "../models/recommendation_rules/recommendation_rules.csv"
)

recommendations_df = recommendations_df.rename(
    columns={
        "antecedents": "product_a_stockcode",
        "consequents": "product_b_stockcode"
    }
)
if "created_at" not in recommendations_df.columns:
    recommendations_df["created_at"] = datetime.now()
recommendations_df = recommendations_df[
    [
        "product_a_stockcode",
        "product_b_stockcode",
        "support",
        "confidence",
        "lift",
        "created_at"
    ]
]

recommendations_df.to_sql(
    "recommendations",
    con=engine,
    if_exists="append",
    index=False
)
print("loaded successfully")

forecast_df = pd.read_csv(
    "../data/processed/sales_forecast.csv"
)

forecast_df["forecast_month"] = pd.to_datetime(
    forecast_df["forecast_month"]
)

if "created_at" not in forecast_df.columns:
    forecast_df["created_at"] = datetime.now()

forecast_df.to_sql(
    "sales_forecasts",
    con=engine,
    if_exists="append",
    index=False
)

print("Sales forecasts loaded")