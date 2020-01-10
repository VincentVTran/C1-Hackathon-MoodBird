import json 
import nltk
import requests
from requests_oauthlib import OAuth1
import twitter
import re
from urllib.parse import quote
from flask import jsonify

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

@app.route('/api/<name>', methods=['GET', 'POST'])
def main(name):

    # PARAMETER SEARCH TERM
    term = quote(name)

    # TWITTER API CALL
    url = "https://api.twitter.com/1.1/search/tweets.json?q=" + term + "&tweet_mode=extended&count=100&locale=ja"
    auth = OAuth1(CONSUMER_KEY, CONSUMER_SECRET,
                    ACCESS_TOKEN, ACCESS_SECRET)

    results = requests.get(url=url, auth=auth)
    res = results.json()
    sid = SentimentIntensityAnalyzer()

    output = []
    for i in range(0, 5):
        location = res['statuses'][i]['user']['location']
        date = res['statuses'][i]['created_at']

        if('retweeted_status' in results.json()['statuses'][i].keys()):
            #if text is a retweet, it may be truncated
            text = res['statuses'][i]['retweeted_status']['full_text']
        else:
            #otherwise get full text
            text = res['statuses'][i]['full_text']
        
        #filter out any links and perform analysis
        text = filter_out_links(text)
        sentiment = sid.polarity_scores(text)

        output.append({
                        'text': text,
                        'location': location,
                        'date': date,
                        'sentiment': sentiment
                        })

    return jsonify(output)

def filter_out_links(text):
    return re.sub(r'http\S+', '', text)

if __name__ == '__main__':
   # ssl._create_default_https_context = _create_unverified_https_context
   # nltk.download('vader_lexicon')
    app.run(debug=False, use_reloader=False)
    #main()
