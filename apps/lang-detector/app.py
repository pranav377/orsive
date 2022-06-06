from fastapi import FastAPI

app = FastAPI()


@app.get("/")
def root():
    return "Lang Detection server up and running"