from sqlalchemy.orm import declarative_base
from sqlalchemy import Column, Integer, Float, String, DateTime, Date

Base = declarative_base()


class Customer(Base):
    __tablename__ = "customers"

    customer_id = Column(Float, primary_key=True)

    segment = Column(String)
    churn_probability = Column(Float)
    clv_tier = Column(String)

    last_updated = Column(DateTime)


class Product(Base):
    __tablename__ = "products"

    stock_code = Column(String, primary_key=True)

    description = Column(String)


class Transaction(Base):
    __tablename__ = "transactions"

    invoice_no = Column(Integer, primary_key=True)

    customer_id = Column(Float)

    invoice_date = Column(DateTime)


class TransactionItems(Base):
    __tablename__ = "transaction_items"
    id = Column(Integer, primary_key=True)
    invoice_no = Column(Integer)

    stock_code = Column(String)

    quantity = Column(Integer)

    unit_price = Column(Float)

    total_price = Column(Float)



class Recommendation(Base):
    __tablename__ = "recommendations"

    id = Column(Integer, primary_key=True)
    product_a_stockcode = Column(String)

    product_b_stockcode = Column(String)

    support = Column(Float)

    confidence = Column(Float)

    lift = Column(Float)

    created_at = Column(DateTime)


class SalesForecast(Base):
    __tablename__ = "sales_forecasts"
    id = Column(Integer, primary_key=True)
    forecast_month = Column(Date)

    predicted_revenue = Column(Float)

    model_name = Column(String)

    created_at = Column(DateTime)
    

