# Database Design

## customers

* customer_id (PK)
* segment
* churn_probability
* clv_tier
* last_updated

## transactions

* invoice_no (PK)
* customer_id (FK)
* invoice_date
* total_price

## transaction_items

* invoice_no (FK)
* stock_code (FK)
* quantity
* unit_price
* total_price

## products

* stock_code (PK)
* description

## customer_predictions

* customer_id (FK)
* segment
* churn_probability
* clv_tier
* prediction_date

## product_recommendations

* product_a
* product_b
* confidence
* lift

## sales_forecasts

* forecast_month
* predicted_revenue
* model_name
* created_at
