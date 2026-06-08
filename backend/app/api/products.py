from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from app.database.connection import get_db
from app.services.product_service import get_top_products, get_product_recommendations, get_product_pairs

router = APIRouter()

@router.get("/products/top")
def products_top(
    db: Session = Depends(get_db)
):
    return get_top_products(db)

@router.get("/products/recommendations")
def recommendations(
    db: Session = Depends(get_db)
):
    return get_product_recommendations(db)

@router.get("/products/pairs")
def product_pairs(
    db: Session = Depends(get_db)
):
    return get_product_pairs(db)