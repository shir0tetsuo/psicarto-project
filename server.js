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

function CreateNavigator(request, response, method) {
  if (method === "sendAuth" && request.url === "/pc/login") {
    return fs.readFileSync('pages/authwait.html')
  } else if (method === "Authorize" && request.url === "/pc/login") {
    return fs.readFileSync('pages/authorized.html')
  } else {
    return fs.readFileSync('pages/index.html')
  }
  // Read token header from client-end here
}

sys.use(express.static('public'))
sys.use(bodyParser.urlencoded({ extended: false })); // allow POST callback
sys.use(bodyParser.json()); // allow POST callback

sys.get('/pc', (request, response) => {
  const method = "get"
  const fsHEAD = fs.readFileSync('pages/head.html')
  const fsAAA = CreateNavigator(request, response, method)// Do some extra stuff to ensure login here
  const fsTRAIL = fs.readFileSync('pages/trail.html')

  const GumGum = fsHEAD + fsAAA + fsTRAIL
  //response.sendFile(path.resolve(__dirname, 'pages/index.html'))
  response.send(GumGum)
})
// TODO: Test idnumber against key, add database
sys.post('/login',function(req,res){
  var idnumber=req.body.idnumber;
  var key = req.body.key;
  if (idnumber !== null && idnumber !== undefined) {
    var method = "sendAuth"
    const fsHEAD = fs.readFileSync('pages/head.html')
    const fsAAA = CreateNavigator(req, res, method)// Do some extra stuff to ensure login here
    const fsTRAIL = fs.readFileSync('pages/trail.html')
    console.log("ID = "+idnumber)
    const GumGum = fsHEAD + fsAAA + fsTRAIL
    res.send(GumGum)
  } else if (key !== null && key !== undefined) {
    var method = "Authorize"
    const fsHEAD = fs.readFileSync('pages/head.html')
    const fsAAA = CreateNavigator(req, res, method)// Do some extra stuff to ensure login here
    const fsTRAIL = fs.readFileSync('pages/trail.html')
    console.log("KEY = "+key)
    const GumGum = fsHEAD + fsAAA + fsTRAIL
    res.send(GumGum)
  }

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

/////////////////////////////////////////////////////////
//const fsHeader = fs.readFileSync('headers.html')
//const fsTrailer = fs.readFileSync('trailers.html')

//const server = http.createServer((request, response) => {

//  console.log(request.url)

//  if (request.url === '/') {
//    response.write(fsHeader)
//    response.write('Hello, World!')
//    response.end(fsTrailer)
//  } else if (request.url === '/favicon.ico') {
//    response.end(fs.readFileSync('./favicon.ico'))
//  } else {
//    response.writeHead(400)
//    response.end('I dont exist')
//  }

//})

//server.listen(2500)
//console.log('Server listening.')
