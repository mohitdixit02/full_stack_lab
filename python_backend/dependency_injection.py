from fastapi import FastAPI, Depends
from typing import Callable, Any
import uvicorn

config = {
    "host": "localhost",
    "port": 8000
}

app = FastAPI()

cars_list = [
    "Toyota",
    "Honda",
    "Ford",
    "Chevrolet",
]

v8_car_brands = ["bmw", "merceded", "audi"]

def get_insurance_provider(car_brand: str) -> str: # sub-dependency
    if car_brand in v8_car_brands:
        return "Premium Insurance"
    return "Standard Insurance"

def get_car_engine(car_brand: str) -> str: # sub-dependency
    if car_brand in v8_car_brands:
        return "V8"
    return "V4"

def get_auth_layer_1() -> str:
    print("auth layer 1 executed")
    return "Auth Layer 1"

def get_auth_layer_2() -> str:
    print("auth layer 2 executed")
    return "Auth Layer 2"

# having multiple sub-dependencies - Method 1 - using multiple Depends in the function signature
def get_cars(
    engines: list=Depends(get_car_engine), 
    providers: list=Depends(get_insurance_provider)
) -> list:
    cars_data = [
        {"brand": car, "engine": get_car_engine(car)} for car in cars_list
    ]
    for car in cars_data:
        car["insurance"] = get_insurance_provider(car["brand"])
    return cars_data

# Multiple Dependencies - Method 2 - using a list of Depends in the function signature
# only works if dependencies don't return values
@app.get("/cars/{car_brand}")
def read_cars(
    car_brand: str, 
    dependencies=[Depends(get_auth_layer_1), Depends(get_auth_layer_2)],
    cars: list=Depends(get_cars)    
) -> Any:
    cars.append({
        "brand": car_brand,
        "engine": get_car_engine(car_brand),
        "insurance": get_insurance_provider(car_brand)
    })
    return {
        "cars": cars
    }

if __name__ == "__main__":
    print("Starting the FastAPI application with dependency injection...")
    uvicorn.run(
        app,
        host=config["host"],
        port=config["port"]
    )
