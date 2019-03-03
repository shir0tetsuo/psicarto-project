const exec = require('child_process').exec;
const fs = require('fs')
const http = require('http');

/////////////////////////////////////////////////////////
const fsHeader = fs.readFileSync('headers.html')
const fsTrailer = fs.readFileSync('trailers.html')

const server = http.createServer((request, response) => {

  console.log(request.url)

  if (request.url === '/') {
    response.write(fsHeader)
    response.write('Hello, World!')
    response.end(fsTrailer)
  } else if (request.url === '/favicon.ico') {
    response.end(fs.readFileSync('./favicon.ico'))
  } else {
    response.writeHead(400)
    response.end('I dont exist')
  }

})

server.listen(2500)
console.log('Server listening.')
