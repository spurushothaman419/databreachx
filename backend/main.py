from fastapi import FastAPI, Request
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
import spacy

app = FastAPI()

# ✅ Allow localhost and vercel app
origins = [
    "http://localhost:5173",
    "https://databreachx.vercel.app"
]

# ✅ Add CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,              # Who can call this API
    allow_credentials=True,
    allow_methods=["*"],                # Allow all HTTP methods
    allow_headers=["*"],                # Allow all headers
)

nlp = spacy.load("en_core_web_sm")

class EntityRequest(BaseModel):
    text: str

@app.get("/")
def home():
    return {"message": "✅ FastAPI backend is live"}

@app.post("/entities")
def extract_entities(payload: EntityRequest):
    doc = nlp(payload.text)
    entities = [{"text": ent.text, "label": ent.label_} for ent in doc.ents]
    return {"entities": entities}
