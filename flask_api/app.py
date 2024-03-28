import flask
from flask import Flask, request, Response, jsonify, send_from_directory, abort
import json
import requests
import os
from rembg import remove
from PIL import Image

from flask_cors import CORS

from io import BytesIO
import base64

app = Flask(__name__)
CORS(app, resources={r"/*": {"origins": "*"}})
app.config['CORS_HEADERS'] = 'Content-Type'
print("Loaded")

@app.route('/')
def index():
    return "Hello World"

@app.route('/remove-background', methods=['POST'])
def get_background_removed():

    jsonData = request.get_json()
    img_link = jsonData['image_url']

    input = Image.open(requests.get(img_link, stream=True).raw)
    filename = img_link.split("images%2F")[-1]
    filename = filename.split("?alt")[0]
    extention = filename.split(".")[-1]
    filename = filename.split(".")[0]
    # get image filename and extension from the input     
    output = remove(input)
    

    # Return the image output to the client as base64 string in json format
    buffered = BytesIO()
    output.save(buffered, format="PNG")
    img_str = base64.b64encode(buffered.getvalue())
    return jsonify({"image": img_str.decode('utf-8'), "filename": filename, "extention": extention})
    # return Response(response=json.dumps({"response": result}), mimetype="application/json")

if __name__ == '__main__':
    app.run(debug=True, host='0.0.0.0', port=5000)
    