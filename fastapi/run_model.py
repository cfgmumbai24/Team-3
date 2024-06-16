import time
import numpy as np
from src import omniglue
from src.omniglue import utils
from PIL import Image
import requests
from io import BytesIO

THRESHOLD = 200


# Initialize and load the model
print("> Loading OmniGlue (and its submodules: SuperPoint & DINOv2)...")
start = time.time()
og = omniglue.OmniGlue(
    og_export="./models/omniglue.onnx",
    sp_export="./models/sp_v6.onnx",
    dino_export="./models/dinov2_vitb14_pretrain.pth",
)
print(f"> \tTook {time.time() - start} seconds.")

def load_image_from_url(url):
    response = requests.get(url)
    return Image.open(BytesIO(response.content))

def process_images(img1_url: str, img2_path: str) -> bool:
    # Load images from URLs
    print("> Loading images...")
    #! image0 = np.array(load_image_from_url(img1_url))
    # image1 = np.array(load_image_from_url(img2_url))
    image0 = np.array(Image.open(img1_url)) #!
    image1 = np.array(Image.open(img2_path))

    # Perform inference
    print("> Finding matches...")
    start = time.time()
    match_kp0, match_kp1, match_confidences = og.FindMatches(image0, image1)
    num_matches = match_kp0.shape[0]
    print(f"> \tFound {num_matches} matches.")
    print(f"> \tTook {time.time() - start} seconds.")

    # Filter by confidence
    print("> Filtering matches...")
    match_threshold = 0.02  # Choose any value [0.0, 1.0).
    keep_idx = []
    for i in range(match_kp0.shape[0]):
        if match_confidences[i] > match_threshold:
            keep_idx.append(i)
    num_filtered_matches = len(keep_idx)
    match_kp0 = match_kp0[keep_idx]
    match_kp1 = match_kp1[keep_idx]
    match_confidences = match_confidences[keep_idx]
    print(
        f"> \tFound {num_filtered_matches}/{num_matches} above threshold {match_threshold}"
    )

    # Return True if number of filtered matches exceeds 200, else False
    return num_filtered_matches > THRESHOLD
