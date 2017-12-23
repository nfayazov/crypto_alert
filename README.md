# crypto_alert
This microservice uses a cron job to fire off an [http request](https://api.coinmarketcap.com/v1/ticker/) to fetch prices of cryptocurrencies that I'm interested in. 
It then sends me a text message using Twilio API in case of a drastic price change. You can learn how to get set up with a Twilio account and purchase a phone number [here](https://www.twilio.com/docs/quickstart/node/programmable-sms).

Packages used:
  * [cron](https://www.npmjs.com/package/cron)
  * [axios](https://www.npmjs.com/package/axios)
  * [twilio](https://www.npmjs.com/package/twilio)
