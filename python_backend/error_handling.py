# Exception
from fastapi import FastAPI, HTTPException, Request
from fastapi.responses import JSONResponse
app = FastAPI()
import uvicorn

# Exception Class
class CustomException(Exception):
    def __init__(self, name: str):
        self.name = name

# Exception Handler
@app.exception_handler(CustomException)
async def handler(request: Request, exc: CustomException):
    return JSONResponse(
        status_code=400,
        content={"message": f"Oops! The brand '{exc.name}' is not available."},
    )

car_brands = {
    "Toyota": "Japan",
    "Ford": "USA",
    "Bmw": "Germany",
}

@app.get("/cars/{brand}")
async def get_car(brand: str):
    brand = brand.capitalize()
    if brand not in car_brands:
        raise CustomException(name=brand)
    return {"brand": brand, "origin": car_brands[brand]}

if __name__ == "__main__":
    print("Starting the FastAPI application with custom exception handling...")
    uvicorn.run(
        app,
        host="localhost",
        port=8000,
    )
