from sqlalchemy import func, desc

from app.database.models import (
    Product,
    TransactionItems
    ,Recommendation
)

def get_top_products(db, limit=10):

    results = (
        db.query(
            Product.description,
            func.sum(
                TransactionItems.quantity *
                TransactionItems.unit_price
            ).label("revenue")
        )
        .join(
            Product,
            Product.stock_code ==
            TransactionItems.stock_code
        )
        .group_by(Product.description)
        .order_by(desc("revenue"))
        .limit(limit)
        .all()
    )

    return [
        {
            "product": product,
            "revenue": float(revenue)
        }
        for product, revenue in results
    ]


def get_product_recommendations(db):

    results = (
        db.query(Recommendation)
        .order_by(
            Recommendation.lift.desc()
        )
        .limit(20)
        .all()
    )

    return [
        {
            "product_a": r.product_a_stockcode,
            "product_b": r.product_b_stockcode,
            "confidence": r.confidence,
            "lift": r.lift
        }
        for r in results
    ]

def get_product_pairs(db):

    results = (
        db.query(Recommendation)
        .order_by(
            Recommendation.lift.desc()
        )
        .limit(10)
        .all()
    )

    return [
        {
            "product_a": r.product_a_stockcode,
            "product_b": r.product_b_stockcode,
            "lift": r.lift
        }
        for r in results
    ]

