import json 
import os
from twilio.rest import Client

with open('data.json') as json_data:
    data = json.load(json_data,) 

def call(data):
  if isinstance(data, dict) == False:
    raise Exception("Must be a dict!")

  if ('numbers' in data.keys() ) == False:
    raise Exception("There is not key called numbers, we need it!")

  if isinstance(data['numbers'], list) == False:
    raise Exception("The key numbers must be a list!")

  if len(data['numbers']) == 0:
    raise Exception("At least we need a phone number!")

  account_sid = os.environ['TWILIO_ACCOUNT_SID']
  auth_token = os.environ['TWILIO_AUTH_TOKEN']

  for number in data['numbers']:
    proxy_client = TwilioHttpClient()
    proxy_client.session.proxies = {'https': os.environ['https_proxy']}
    client = Client(account_sid, auth_token, http_client=proxy_client)
    message = client.messages \
          .create(
          body="Your message",
          from_='Your Twilio number',
          to=number
      )
    print(message.sid)
    

call(data)
 