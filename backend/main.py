from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.api.dashboard import router as dashboard_router
from app.api.customers import router as customer_router
from app.api.products import router as product_router
from app.api.forecast import router as forecast_router
app = FastAPI()
app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "https://ai-customer-intelligence.vercel.app/"
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)
app.include_router(dashboard_router)
app.include_router(customer_router)
app.include_router(product_router)
app.include_router(forecast_router)

@app.get("/health")
def health_check():
    return {"status": "healthy"}