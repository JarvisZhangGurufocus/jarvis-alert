const express = require('express')
const app = express()

const bodyParser = require('body-parser')
const jsonParser = bodyParser.json()

const RedisSMQ = require("rsmq");
const rsmq = new RedisSMQ({})
rsmq.createQueue({ qname: "alert" }, (err, res) => {
  console.log(err, res)
})

app.post('/event', jsonParser, (req, res) => {
  rsmq.sendMessage({ qname: "alert", message: 'alert' }, (err, res) => {
    console.log(err, res)
  })
  res.json({
    challenge: req.body.challenge
  })
})

app.get('/event', (req, res) => {
  rsmq.popMessage({ qname: "alert" }, (_, text) => {
    if (text) {
      res.send(text)
    }
  })
})

const http = require('http')
const server = http.createServer(app)
server.listen(80, function () {
  console.log('Server listening on port 80!')
})