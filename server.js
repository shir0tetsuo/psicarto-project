const settings = require('./settings.json')
const exec = require('child_process').exec;
const fs = require('fs')
const http = require('http');
const express = require('express')
const sys = express()
const path = require('path')


sys.use(express.static('public'))

sys.get('/', (request, response) => {
  response.sendFile(path.resolve(__dirname, 'pages/index.html'))
})

sys.listen(2600, () => {
  console.log('App listening.')
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
