
from fastapi import APIRouter, HTTPException, Request
import secrets

router = APIRouter()

# In-memory for PoC; use Supabase or DB in production
licenses = {}

def generate_license_key(user_email: str) -> str:
    key = secrets.token_urlsafe(16)
    licenses[key] = {"email": user_email, "tier": "pro"}
    return key

def verify_license_key(key: str) -> bool:
    return key in licenses

@router.post("/license/generate")
async def generate(data: dict):
    email = data.get("email")
    if not email:
        raise HTTPException(status_code=400, detail="Email required")
    return {"license_key": generate_license_key(email)}

@router.post("/license/verify")
async def verify(data: dict):
    key = data.get("license_key")
    if not key or not verify_license_key(key):
        raise HTTPException(status_code=404, detail="Invalid license key")
    return {"valid": True, "tier": licenses[key]["tier"]}
