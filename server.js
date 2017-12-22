const express = require('express');
const path = require('path');
const twilio = require('twilio');
const dotenv = require('dotenv').load();

const app = express();
const client = new twilio(process.env.TWILIO_ACCOUNT_SID, process.env.TWILIO_AUTH_TOKEN);
const cron = require('cron').CronJob;

//var textJob = new cron('53 22 * * *', function () {
client.messages.create({ to: '+13475150058', from: process.env.TWILIO_PHONE_NUMBER, body: 'It fucking works!' }, 
                        function (err, data) {
                           if (err) console.log(err);
                           else console.log(data)
                        });
//});


/*app.get('/', (req, res) => {
   res.send('Hello World');
})

const port = process.env.PORT || 8000;

app.listen(port, () => console.log("Listening to port %d", port));*/