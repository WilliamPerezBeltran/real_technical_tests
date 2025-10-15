let array = {
  "numbers": [
    "+18483211234",
    "+14151234567",
    "+19103217654",
    "+12314567890",
    "+17076543210"
  ]
}


console.log()

const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const client = require('twilio')(accountSid, authToken);

client.messages
  .create({
     body: 'This is the ship that made the Kessel Run in fourteen parsecs?',
     from: '+15017122661',
     to: '+15558675310'
   })
  .then(message => console.log(message.sid));



array.numbers.forEach(function(number,ind) {
    console.log(number);   
})



numbers = ['+1234562525','+1552645232']
for number in numbers:
    proxy_client = TwilioHttpClient()
    proxy_client.session.proxies = {'https': os.environ['https_proxy']}
    client = Client(account_sid, auth_token, http_client=proxy_client)
    message = client.messages \
        .create(
        body="Your message",
        from_='Your Twilio number',
        to=number
    )