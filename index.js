var express = require('express')
var app = express()

app.get('/', function(request, response) {
  response.send('Hello')
})

app.listen(5000, function() {
  console.log('Node app listening on port 5000...')
})
