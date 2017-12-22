const express = require('express');
const path = require('path');

const app = express();
//const react_app = require('./src/App')

app.use(express.static(path.join(__dirname, '/build')));

app.get('/', (req, res) => {
   res.sendFile(path.join(__dirname + '/build/public/index.html'));
})

const port = process.env.PORT || 8000;

app.listen(port, () => console.log("Listening to port %d", port));