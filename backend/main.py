from flask import Flask, request, jsonify
import joblib
import numpy as np
import pandas as pd
import pickle
from sklearn.preprocessing import StandardScaler
from io import StringIO
import os
import pdb

app = Flask(__name__)

model_path = os.environ.get('MODEL_PATH', 'model.pkl')
scaler_path = os.environ.get('SCALER_PATH', 'scaler.pkl')

# Load the model using pickle when the app starts
with open(model_path, 'rb') as model_file:
    model = pickle.load(model_file)

scaler = joblib.load(scaler_path)

def preprocess_data(json):
    csv_string = json.get('csv', '')
    data = StringIO(csv_string[0])
    file =  pd.read_csv(data, header=None)
    midpoint = len(file) // 2
    second_half = file.iloc[midpoint:]
    second_half_array = second_half.values
    return second_half_array

def normalise_data(data):
    flattened_data = data.flatten()
    data_length = flattened_data.shape[0]
    if data_length < 4470:
        flattened_data = np.pad(flattened_data, (0, 4470 - data_length), mode='constant')
    else:
        flattened_data = flattened_data[:4470]

    X_reshaped = flattened_data.reshape(1, -1)
    x_standardised = scaler.transform(X_reshaped)

    return x_standardised


@app.route('/', methods=['GET', 'POST'])
def index():
    if request.method == 'GET':
        return "Hello World"
    if request.method == 'POST':
        if not request.json:
            return jsonify({'error': 'No JSON data provided'}), 400
        data = preprocess_data(request.json)
        if data is None:
            return jsonify({'error': 'Invalid data'}), 400
        data = normalise_data(data)
        if data is None:
            return jsonify({'error': 'Error normalising data'}), 500
        prediction = model.predict(data)[0]
        result = 'abnormal' if prediction == 0 else 'normal'
        return jsonify({'prediction': result})

if __name__ == '__main__':
    app.run(debug=False)  # Set debug to False for production
