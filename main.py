from fastapi.responses import HTMLResponse
from fastapi import Form
from fastapi import FastAPI, Request
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from fastapi.templating import Jinja2Templates
from typeID import TypeID

from stationID import StationID



app = FastAPI()

origins = [
    "http://192.168.1.2",
    "http://192.168.1.2:80",
    "http://192.168.1.2:8000",
    "http://127.0.0.1",
    "http://127.0.0.1:80",
    "http://127.0.0.1:8000",
    "http://localhost",
    "http://localhost:80",
    "*"
    
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"]
)

class User(BaseModel):
    username: str
    useremail: str
    password1: str
    password2: str

templates = Jinja2Templates(directory="./")


id_request = TypeID()

station_name_request = StationID()

@app.get("/itemID/{item_name}")
async def get_iteme_id(item_name: str):
    item_id = id_request.getID(item_name)
    return {"typeID": item_id}

@app.get("/stationID/{station_id}")
async def get_station_name(station_id: str):
    station_name = station_name_request.getID(station_id)
    return {"stationName": station_name}

@app.get("/count")
async def get_count_resources():
    return {"iron": 3, "wood": 1, "coal": 1, "gold": 1}

@app.get("/register", response_class=HTMLResponse)
async def register(request: Request):
    return templates.TemplateResponse("register.html", {"request": request}) 

@app.post("/submit", response_model=User)
async def user_reg_submit(name: str = Form(...), email: str = Form(...), password1: str = Form(...), password2: str = Form(...)):
    return User(username=name, useremail=email, password1=password1, password2=password2 )
