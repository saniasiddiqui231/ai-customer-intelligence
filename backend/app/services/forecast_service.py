from sqlalchemy import func

from app.database.models import (
    Transaction,
    TransactionItems,
    SalesForecast
)


def get_revenue_forecast(db):

    historical = (
        db.query(
            func.date_trunc(
                "month",
                Transaction.invoice_date
            ).label("month"),

            func.sum(
                TransactionItems.quantity *
                TransactionItems.unit_price
            ).label("revenue")
        )
        .join(
            TransactionItems,
            Transaction.invoice_no ==
            TransactionItems.invoice_no
        )
        .group_by("month")
        .order_by("month")
        .all()
    )

    historical_data = [
        {
            "month": row.month.strftime("%Y-%m"),
            "revenue": float(row.revenue)
        }
        for row in historical
    ]

    forecasts = (
        db.query(SalesForecast)
        .all()
    )

    forecast_data = [
        {
            "month": row.forecast_month.strftime("%Y-%m"),
            "revenue": float(row.predicted_revenue)
        }
        for row in forecasts
    ]

    return {
        "historical": historical_data,
        "forecast": forecast_data
    }