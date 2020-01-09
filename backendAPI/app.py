import os
import json 
import ssl
import nltk
import requests
import twitter
import pprint

from nltk.sentiment.vader import SentimentIntensityAnalyzer
from flask import Flask, render_template, url_for, request, redirect, session

app = Flask(__name__)

with open('keys.json', 'r') as keysJSON:
        keys = json.load(keysJSON)

ACCESS_TOKEN = keys['Access Token']
ACCESS_SECRET = keys['Access Token Secret']
CONSUMER_KEY = keys['API Key']
CONSUMER_SECRET = keys['API Secret Key']

#################
#
# HOME PAGE
#
#################

# Main route to render the home page of the app
@app.route('/')
def index():
    return render_template('index.html', template_folder="../frontend")


#################
#
# API ROUTES
#
#################

@app.route('/api/<term>')
def main(term='Capital One'):
    # TWITTER API CALL
    t = twitter.Api(consumer_key=CONSUMER_KEY,
                consumer_secret=CONSUMER_SECRET,
                access_token_key=ACCESS_TOKEN,
                access_token_secret=ACCESS_SECRET)

    results = t.GetSearch(term='Capital one', count=10, return_json=True)#, geocode="39.290386, -76.612190, 100mi")

    print(results)

    sid = SentimentIntensityAnalyzer()


if __name__ == '__main__':
   # ssl._create_default_https_context = _create_unverified_https_context
   # nltk.download('vader_lexicon')
    #app.run(debug=False, use_reloader=False)
    main()
