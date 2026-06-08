from sqlalchemy import func

from app.database.models import (
    Customer,
    Transaction,
    TransactionItems
)


def get_dashboard_summary(db):

    total_revenue = (
        db.query(
            func.sum(
                TransactionItems.quantity *
                TransactionItems.unit_price
            )
        )
        .scalar()
    )

    total_customers = (
        db.query(Customer)
        .count()
    )

    total_orders = (
        db.query(Transaction)
        .count()
    )

    return {
        "total_revenue": float(total_revenue or 0),
        "total_customers": total_customers,
        "total_orders": total_orders
    }