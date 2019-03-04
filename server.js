const settings = require('./settings.json')
const exec = require('child_process').exec;
const fs = require('fs')
const bodyParser = require('body-parser')
const http = require('http');
const express = require('express')
const sys = express()
const path = require('path')
const Discord = require ("discord.js"); // discord client
const client = new Discord.Client(); // discord client

function CreateNavigator(request, response) {
    return fs.readFileSync('pages/index.html')
  // Read token header from client-end here
}

function CreateResponse(request, response, handle) {
  if (handle == 'error') return fs.readFileSync('pages/Error.html');
  if (handle == 'idnum') return fs.readFileSync('pages/Icheck.html');
  if (handle == 'key') return fs.readFileSync('pages/Kcheck.html')
}

sys.use(express.static('public'))
sys.use(bodyParser.urlencoded({ extended: false })); // allow POST callback
sys.use(bodyParser.json()); // allow POST callback

sys.get('/pc', (request, response) => {
  const fsHEAD = fs.readFileSync('pages/head.html')
  const fsAAA = CreateNavigator(request, response)// Do some extra stuff to ensure login here
  const fsTRAIL = fs.readFileSync('pages/trail.html')

  const GumGum = fsHEAD + fsAAA + fsTRAIL
  //response.sendFile(path.resolve(__dirname, 'pages/index.html'))
  response.send(GumGum)
})
// TODO: Test idnumber against key, add database
sys.post('/pc/login',function(req,res){
  var idnumber=req.body.idnumber;
  var key = req.body.key;
  const fsHEAD = fs.readFileSync('pages/head.html')
  if (idnumber.length !== 0 && key.length !== 0) {
    var fsAAA = CreateNavigator(req, res)
    var fsAAB = CreateResponse(req, res, 'error')
  } else if (idnumber.length !== 0 && key.length == 0 && idnumber.isNaN(false)) {
    var fsAAA = CreateNavigator(req, res)
    var fsAAB = CreateResponse(req, res, 'idnum')
  } else if (key.length !== 0 && idnumber.length == 0) {
    var fsAAA = CreateNavigator(req, res)
    var fsAAB = CreateResponse(req, res, 'key')
  } else {
    var fsAAA = CreateNavigator(req, res)
    var fsAAB = CreateResponse(req, res, 'error')
  }
  const fsTRAIL = fs.readFileSync('pages/trail.html')
  const GumGum = fsHEAD + fsAAA + fsTRAIL + fsAAB
  res.send(GumGum)
});

client.on("ready", () => {
  console.log("SPIRITO-BOT ONLINE")
  client.user.setStatus("online")
});

sys.listen(2600, () => {
  console.log('App listening.')
  client.login(settings.token);
  console.log('Discord listening.')
  client.on('error', console.error)
})
