var express = require('express')

export const baseurl =  'http://localhost:5000/api'

var app = express()
var port =  process.env.PORT || 3000
app.use(express.static('build'))
app.listen(port)