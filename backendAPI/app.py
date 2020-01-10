import os
import json 
import ssl
import nltk
import requests
from requests_oauthlib import OAuth1
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

@app.route('/api')
def main():

    # ADD A PARAMETER SEARCH TERM

    # TWITTER API CALL
    url = "https://api.twitter.com/1.1/search/tweets.json?q=football&tweet_mode=extended&count=100"
    auth = OAuth1(CONSUMER_KEY, CONSUMER_SECRET,
                    ACCESS_TOKEN, ACCESS_SECRET)

    results = requests.get(url=url, auth=auth)
    res = results.json()

    for i in range(0, 5):
        if('retweeted_status' in results.json()['statuses'][i].keys()):
            print("RETWEET",res['statuses'][i]['retweeted_status']['full_text'])
        else:
            print(res['statuses'][i]['full_text'])

        print(res['statuses'][i]['user']['location'])
        print(res['statuses'][i]['created_at'])
        print('---------------------------------------------------------------')
    
    sid = SentimentIntensityAnalyzer()
    sid.polarity_scores(res['statuses'][0]['full_text'])


if __name__ == '__main__':
   # ssl._create_default_https_context = _create_unverified_https_context
   # nltk.download('vader_lexicon')
    #app.run(debug=False, use_reloader=False)
    main('term')
