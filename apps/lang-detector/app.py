
from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
import fasttext
from langcodes import Language

fasttext_model = fasttext.load_model('./lid.176.bin')

app = FastAPI()

@app.get("/")
def root():
    return "Lang Detection server up and running"

class DetectArgs(BaseModel):
    content: str

@app.post("/detect/")
def detect(args: DetectArgs):
    if (args.content.strip() == ""):
        raise HTTPException(status_code=400)

    langCode = fasttext_model.predict(args.content)[0][0].replace('__label__', '')
    result = Language.get(langCode).display_name()

    return {"result": result}