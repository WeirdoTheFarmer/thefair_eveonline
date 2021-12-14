from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from typeID import TypeID

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

@app.get("/itemID/{item_name}")
async def root(item_name: str):
    item_id = id_request.getID(item_name)
    return {"typeID": item_id}