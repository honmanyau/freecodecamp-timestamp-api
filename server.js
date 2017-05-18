'use strict'
// server.js
// where your node app starts

// init project
const express = require('express');
const app = express();
const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

app.use(express.static('public'));
app.use((request, response, next) => {
  console.log(request.method + " " + request.url + " " + request.params);
  next();
})

app.get("/", function (request, response) {
  response.sendFile(__dirname + '/views/index.html');
});

app.get("/:input", function (request, response, next) {
  const input = request.params.input;
  const match = input.match(/([A-Za-z]+)\s(\d+),\s(\d+)/);
  let date;
  let unixTimestamp = null;
  let naturalDateString = null;
  
  // Check for a valid integer inputs
  if (!isNaN(input % 1) && input.indexOf(".") === -1) {
    date = new Date(parseInt(input) * 1000);
    unixTimestamp = input;
    naturalDateString = months[date.getMonth()] + " " + date.getDate() + ", " + date.getFullYear();
  }
  // Check for a valid natural date input
  else if (match && months.indexOf(match[1]) !== -1) {
    date = new Date(match[3], months.indexOf(match[1]), match[2]);
    unixTimestamp = date.getTime() / 1000;
    naturalDateString = input;
  }
  
  response.json({
    "unix": unixTimestamp,
    "natural": naturalDateString
  });
  
  next();
});

// listen for requests :)
var listener = app.listen(process.env.PORT, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});