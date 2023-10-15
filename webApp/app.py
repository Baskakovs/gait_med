from flask import Flask, render_template, request, redirect, url_for, flash
import pandas as pd
import numpy as np
import tensorflow as tf

app = Flask(__name__)
app.secret_key = 'some_secret_key'  # for flash messages

# This function will load and return the pre-trained model
def load_model():
    # For the sake of this example, I'm assuming a model.h5 is present
    model = tf.keras.models.load_model('model.h5')
    return model

model = load_model()

@app.route('/', methods=['GET', 'POST'])
def index():
    if request.method == 'POST':
        # check if the post request has the file part
        if 'file' not in request.files:
            flash('No file part')
            return redirect(request.url)

        file = request.files['file']
        if file.filename == '':
            flash('No selected file')
            return redirect(request.url)
        
        # Convert file content to DataFrame
        df = pd.read_csv(file)
        
        # Convert dataframe to numpy array
        array_data = df.to_numpy()
        
        # Get prediction from the model
        prediction = model.predict(array_data)
        
        # Render the same page with the prediction
        return render_template('index.html', prediction=str(prediction))
        
    return render_template('index.html', prediction=None)

if __name__ == '__main__':
    app.run(debug=True)