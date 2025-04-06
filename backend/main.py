from fastapi import FastAPI, Request
from pydantic import BaseModel
from fastapi.middleware.cors import CORSMiddleware
import spacy

app = FastAPI()

# ✅ IMPORTANT: CORS fix
app.add_middleware(
    CORSMiddleware,
    allow_origins=["https://databreachx.vercel.app"],  # only allow frontend origin
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
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