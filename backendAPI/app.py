import os
import json 
import ssl
import nltk

from nltk.sentiment.vader import SentimentIntensityAnalyzer
from flask import Flask, render_template, url_for, request, redirect, session

app = Flask(__name__)

# URL = 

# 
@app.route('/api')
def main():

    # TWITTER API CALL

    sid = SentimentIntensityAnalyzer()
    print(sid.polarity_scores('testing'))

    # LOOP FOR 

    return jsonify({"test":"testing"})


if __name__ == '__main__':
   # ssl._create_default_https_context = _create_unverified_https_context
   # nltk.download('vader_lexicon')

    app.run(debug=False, use_reloader=False)