const express = require('express');
const path = require('path');
const dotenv = require('dotenv').load();
const axios = require('axios');

const app = express();
const client = require('twilio')(process.env.TWILIO_ACCOUNT_SID, process.env.TWILIO_AUTH_TOKEN);
const cron = require('cron').CronJob;

function sendMessage(text) {
      client.messages.create({ to: process.env.MY_NUMBER, from: process.env.TWILIO_PHONE_NUMBER, body: text },
         function (err, data) {
            if (err) console.log(err);
            console.log(data);
         });
}

var textJob = new cron('00 00 */6 * * *', function () {
   var message = ""
   axios.get('https://api.coinmarketcap.com/v1/ticker/').then(res => {
      if (res.data[0]["percent_change_24h"] < 5)
         message += "BTC price fell by " + res.data[0]["percent_change_24h"] + "% in the last 24 hours\n";
      if (res.data[1]["percent_change_24h"] < 5)
         message += "ETH price fell by " + res.data[1]["percent_change_24h"] + "% in the last 24 hours\n";
      if (res.data[2]["percent_change_24h"] < 5)
         message += "BTH price fell by " + res.data[2]["percent_change_24h"] + "% in the last 24 hours\n";
      sendMessage(message);
   }).catch(err => {
         sendMessage(err.message);
   })
}, null, true, 'America/Los_Angeles');

const port = process.env.PORT || 8000;

app.listen(port);