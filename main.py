from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from typeID import TypeID
from stationsID import StationsID

app = FastAPI()

origins = [
    "http://192.168.1.2"
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"]
)

id_request = TypeID()
read_location_ID = StationsID()

@app.get("/itemID/{item_name}")
async def get_item_name(item_name: str):
    item_id = id_request.getID(item_name)
    return {"typeID": item_id}

@app.get("/location/{location_id}")
async def get_location_name(location_id: str):
    location_name = read_location_ID.getID(location_id) 
    return {"locationID": location_name}