import joblib
from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
from sklearn.preprocessing._label import LabelEncoder
from sklearn.svm._classes import SVC
from sklearn.feature_extraction.text import TfidfVectorizer

vectorizer:TfidfVectorizer = joblib.load('./vectorizer.sav')
model:SVC = joblib.load('./languageModel.model')
encoder:LabelEncoder = joblib.load('./label.encoder')

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

    content = vectorizer.transform([args.content])
    result = encoder.inverse_transform(model.predict(content))[0]

    return {"result": result}
