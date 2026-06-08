from sqlalchemy import func

from app.database.models import (
    Customer
)


def get_customer_segment(db):
    results = (
        db.query(
            Customer.segment,
            func.count(Customer.customer_id)
        )
        .group_by(Customer.segment)
        .all()
    )

    return [
        {
            "segment": segment,
            "count": count
        }
        for segment, count in results
    ]
  
def get_customer_churn(db):

    avg_churn = (
        db.query(
            func.avg(Customer.churn_probability)
        )
        .scalar()
    )

    high_risk = (
        db.query(Customer)
        .filter(
            Customer.churn_probability >= 0.7
        )
        .count()
    )

    return {
        "average_churn_probability":
            round(avg_churn or 0, 4),
        "high_risk_customers":
            high_risk
    }

def get_customer_clv(db):

    results = (
        db.query(
            Customer.clv_tier,
            func.count(Customer.customer_id)
        )
        .group_by(Customer.clv_tier)
        .all()
    )

    return [
        {
            "clv_tier": tier,
            "count": count
        }
        for tier, count in results
    ]