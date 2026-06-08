from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from app.database.connection import get_db

from app.services.forecast_service import (
    get_revenue_forecast
)

router = APIRouter()


@router.get("/forecast/revenue")
def revenue_forecast(
    db: Session = Depends(get_db)
):
    return get_revenue_forecast(db)