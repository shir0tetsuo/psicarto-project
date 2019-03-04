const settings = require('./settings.json')
const exec = require('child_process').exec;
const fs = require('fs')
const http = require('http');
const express = require('express')
const sys = express()
const path = require('path')
const Discord = require ("discord.js"); // discord client
const client = new Discord.Client(); // discord client



function CreateNavigator(request, response) {
  // Read token header from client-end here
  return fs.readFileSync('pages/index.html')
}

sys.use(express.static('public'))

sys.get('/', (request, response) => {
  const fsHEAD = fs.readFileSync('pages/head.html')
  const fsAAA = CreateNavigator(request, response)// Do some extra stuff to ensure login here
  const fsTRAIL = fs.readFileSync('pages/trail.html')

  const GumGum = fsHEAD + fsAAA + fsTRAIL
  //response.sendFile(path.resolve(__dirname, 'pages/index.html'))
  response.send(GumGum)
})

sys.post('/login', (request, response) => {
  console.log(request)
})


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
