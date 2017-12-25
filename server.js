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
      if (res.data[0]["percent_change_24h"] < -5)
         message += "BTC price fell by " + res.data[0]["percent_change_24h"] + "% in the last 24 hours\n";
      if (res.data[1]["percent_change_24h"] < -5)
         message += "ETH price fell by " + res.data[1]["percent_change_24h"] + "% in the last 24 hours\n";
      if (res.data[2]["percent_change_24h"] < -5)
         message += "BTH price fell by " + res.data[2]["percent_change_24h"] + "% in the last 24 hours\n";
      if (message != "") sendMessage(message);
      else console.log("Nothing to send");
   }).catch(err => {
         sendMessage(err.message);
   })
}, null, true, 'America/Los_Angeles');

function verifyPhoneNumber(num) {
      axios.post('https://api.authy.com/protected/json/phones/verification/start', {
            api_key: process.env.VERIFY_API_KEY,
            via: 'sms',
            phone_number: num,
            country_code: '1'
      }).then(res => {
            console.log(res);
      }).catch(err => {
            console.log(err);
      })
}

app.get('/', function(req, res) {
   var file = path.join(__dirname, "public/index.html");
   if (Object.keys(req.query).length == 0)
      res.sendFile(file);
   else verifyPhoneNumber(req.query.phone_number);
})

const port = process.env.PORT || 8000;

app.listen(port);
