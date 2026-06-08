from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from app.database.connection import get_db
from app.database.models import Customer
from app.services.customer_service import (
    get_customer_segment,
    get_customer_churn,
    get_customer_clv
)
router = APIRouter()


@router.get("/customers/segments")
def customer_segments(
    db: Session = Depends(get_db)
):
    return get_customer_segment(db)

@router.get("/customers/churn")
def customer_churn(
    db: Session = Depends(get_db)
):
    return get_customer_churn(db)

@router.get("/customers/clv")
def customer_clv(
    db: Session = Depends(get_db)
):
    return get_customer_clv(db)