from fastapi import FastAPI, File, UploadFile, HTTPException
from fastapi.responses import JSONResponse, FileResponse
from run_model import process_images
from pathlib import Path

app = FastAPI()

@app.get("/")
async def root():
    return {"Hello": "World"}

@app.post("/match")
async def match_images(file: UploadFile = File(...)):
    STATIC_IMAGE_PATH = 'data/diff_1.jpeg'

    if file.filename == '':
        raise HTTPException(status_code=400, detail="No selected file")

    try:
        file_contents = await file.read()
        output_image_path = process_images(file_contents, STATIC_IMAGE_PATH)
        return FileResponse(output_image_path, media_type='image/png')
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@app.get("/test")
async def test():
    ans = process_images("data/diff_1.jpeg", "data/neck_clear.jpeg")
    
    return {"Result": ans}

if __name__ == '__main__':
    import uvicorn
    uvicorn.run(app, port=5000)
