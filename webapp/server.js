var express = require('express')

export const baseurl = process.env.REACT_APP_API_URI || 'http://localhost:8080/api'

var app = express()
var port =  process.env.PORT || 3000
app.use(express.static('build'))
app.listen(port)