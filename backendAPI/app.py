import os
import json 
import ssl
import nltk
import requests
import twitter

from nltk.sentiment.vader import SentimentIntensityAnalyzer
from flask import Flask, render_template, url_for, request, redirect, session

app = Flask(__name__)

with open('keys.json', 'r') as keysJSON:
        keys = json.load(keysJSON)

ACCESS_TOKEN = keys['Access Token']
ACCESS_SECRET = keys['Access Token Secret']
CONSUMER_KEY = keys['API Key']
CONSUMER_SECRET = keys['API Secret Key']

# url for API calls used later
# URL = ''

@app.route('/api')
def main():
    # TWITTER API CALL
    t = twitter.Api(consumer_key=CONSUMER_KEY,
                consumer_secret=CONSUMER_SECRET,
                access_token_key=ACCESS_TOKEN,
                access_token_secret=ACCESS_SECRET)

    #results = t.GetSearch(raw_query="q=%23CapitalOne")
    results = t.GetSearch(term='Capital One')

    print(results[0])

    #r = requests.get(url=URL, params=params)
    #data = r.json()

    sid = SentimentIntensityAnalyzer()

    #for sentence in data:

    #    result = sid.polarity_scores(sentence)
    #    data['tweet']['results'] = 



    #return jsonify(data)
    


if __name__ == '__main__':
   # ssl._create_default_https_context = _create_unverified_https_context
   # nltk.download('vader_lexicon')
    #app.run(debug=False, use_reloader=False)
    main()
