var express = require('express')
var app = express()
var dateObject = { 'unix': null, 'natural': null}

function createDateOject(timeobject, parsedDate) {
  var monthNames = ["January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December"
]
  var month = monthNames[timeobject.getMonth()]
  var day = timeobject.getDate()
  var year = timeobject.getFullYear()
  var dateString = month + ' ' + day + ', ' + year
  dateObject = { 'unix': parsedDate, 'natural': dateString }
  return dateObject
}

app.set('port', (process.env.PORT || 5000));

app.get('/:TIME', function(request, response) {
  var time = request.params.TIME
  var timeobject = new Date(time)
  var parsedDate = Date.parse(timeobject)
  if (JSON.stringify(timeobject)[11] === 'T') {
    dateObject = createDateOject(timeobject, parsedDate)
    response.sendStatus(JSON.stringify(dateObject))
  } else {
    response.sendStatus(JSON.stringify(dateObject))
  }
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
