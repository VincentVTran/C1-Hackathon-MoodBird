import json 
import nltk
import requests
from requests_oauthlib import OAuth1
import re
from urllib.parse import quote
from flask import jsonify
import datetime

from nltk.sentiment.vader import SentimentIntensityAnalyzer
from flask import Flask, render_template, url_for, request, redirect, session
from flask_cors import CORS, cross_origin

app = Flask(__name__)
CORS(app, support_credentials=True)

with open('keys.json', 'r') as keysJSON:
        keys = json.load(keysJSON)

ACCESS_TOKEN = keys['Access Token']
ACCESS_SECRET = keys['Access Token Secret']
CONSUMER_KEY = keys['API Key']
CONSUMER_SECRET = keys['API Secret Key']

auth = OAuth1(CONSUMER_KEY, CONSUMER_SECRET,
                ACCESS_TOKEN, ACCESS_SECRET)

#################
#
# API ROUTES
#
#################

@app.route('/api/<name>', methods=['GET', 'POST'])
@cross_origin(supports_credentials=True)
def main(name):
    until = "&until="
    url_date = '' # empty id holder
    max_count = 100 # limit of 100
    output = []
    sid = SentimentIntensityAnalyzer()

    # PARAMETER SEARCH TERM
    term = quote(name)

    for i in range(0,7):

        # TWITTER API CALL
        url = "https://api.twitter.com/1.1/search/tweets.json?q=" + term + "&tweet_mode=extended&count=" + str(max_count) + "&locale=ja&since_id=0" + ('' if i == 0 else str(until) + str(url_date))
        results = requests.get(url=url, auth=auth)
        res = results.json()

        if('statuses' not in res):
            print('STATUSES MISSING')
            break

        for tweet in res['statuses']:
            # extract info from tweets
            location = tweet['user']['location']
            date = tweet['created_at']
            id = tweet['id']

            if('retweeted_status' in tweet.keys()):
                #if text is a retweet, it may be truncated
                text = tweet['retweeted_status']['full_text']
            else:
                #otherwise get full text
                text = tweet['full_text']
            
            #filter out any links and format date
            text = filter_out_links(text)
            url_date = tweet_format_to_date(date)

            # perform analysis
            sentiment = sid.polarity_scores(text)

            output.append({
                            'text': text,
                            'location': location,
                            'date': url_date,
                            'sentiment': sentiment,
                            'id': id,
                            })

    return jsonify(output)

def filter_out_links(text):
    """ Function for filtering out links from given text in a tweet """
    return re.sub(r'http\S+', '', text)

def tweet_format_to_date(date):
    """ Function for converting date to twitter api format """
    month_name = date[4:7]
    day = date[8:10]
    year = date[-4:]
    
    month_number = datetime.datetime.strptime(month_name, '%b').month
    month_number = str(month_number).zfill(2)

    return year + '-' + month_number + '-' + day
    

if __name__ == '__main__':
    # Two lines below only Run ONCE
    # ssl._create_default_https_context = _create_unverified_https_context
    # nltk.download('vader_lexicon') 
    app.run(debug=False, use_reloader=False)
