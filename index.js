var express = require('express')
var app = express()
var dateObject = { 'unix': null, 'natural': null}

function createDateOjectFromString(timeobject, parsedDate) {
  var monthNames = ["January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December"
]
  var month = monthNames[timeobject.getMonth()]
  var day = timeobject.getDate()
  var year = timeobject.getFullYear()
  var dateString = month + ' ' + day + ', ' + year
  dateObject = { 'unix': +parsedDate / 1000, 'natural': dateString }
  return dateObject
}

function createDateOjectFromNumber(timeobject, stringTime) {
  var monthNames = ["January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December"
]
  var month = monthNames[timeobject.getMonth()]
  var day = timeobject.getDate()
  var year = timeobject.getFullYear()
  var ms = Date.parse(JSON.stringify(timeobject))
  var dateString = month + ' ' + day + ', ' + year
  dateObject = { 'unix': +stringTime, 'natural': dateString }
  return dateObject

}

app.set('port', (process.env.PORT || 5000));

app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');

app.get('/', function(request, response) {
  response.render('pages/index')
})

app.get('/:TIME', function(request, response) {
  var stringTime = request.params.TIME
  if (isNaN(stringTime)) {
    var timeobject = new Date(stringTime)
    var parsedDate = Date.parse(timeobject)
    if (JSON.stringify(timeobject)[11] === 'T') {
      dateObject = createDateOjectFromString(timeobject, parsedDate)
      response.send(JSON.stringify(dateObject))
    } else {
      dateObject = { 'unix': null, 'natural': null}
      response.send(JSON.stringify(dateObject))
    }
  } else {
    var timeobject = new Date(+stringTime * 1000)
    dateObject = createDateOjectFromNumber(timeobject, stringTime)
    response.send(JSON.stringify(dateObject))
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
