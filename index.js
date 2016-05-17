var express = require('express')
var app = express()

app.set('port', (process.env.PORT || 5000));

app.get('/', function(request, response) {
  response.send('Hello')
})

// ---- User stories ----

// I can pass a string as a parameter, and it will
// check to see whether that string contains either
// a unix timestamp or a natural language date
// (example: January 1, 2016).

// If it does, it returns both the Unix timestamp
// and the natural language form of that date.

// If it does not contain a date or Unix timestamp,
// it returns null for those properties.

app.listen(app.get('port'), function() {
  console.log('Node app is running on port', app.get('port'));
});
