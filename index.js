const express = require('express')
const app = express()

const bodyParser = require('body-parser')
const jsonParser = bodyParser.json()

app.post('/event', jsonParser, (req, res) => {
  console.log(req.body)
  res.json({
    challenge: req.body.challenge
  })
})

const http = require('http')
const server = http.createServer(app)
server.listen(80, function () {
  console.log('Server listening on port 80!')
})