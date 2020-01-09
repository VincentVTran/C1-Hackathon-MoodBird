import os
import json 
import ssl
import nltk

from nltk.sentiment.vader import SentimentIntensityAnalyzer
from flask import Flask, render_template, url_for, request, redirect, session


app = Flask(__name__)


# Start page for the app where users can enter the stock symbol of
# the company that they would like to analyze
@app.route('/')
def home():
    return render_template('index.html')



if __name__ == '__main__':
    ssl._create_default_https_context = _create_unverified_https_context
    nltk.download('vader_lexicon')
#    sid = SentimentIntensityAnalyzer()
#    sid.polarity_scores(sentence)
    app.run(debug=False, use_reloader=False)