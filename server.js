const settings = require('./settings.json')
const exec = require('child_process').exec;
const fs = require('fs')
const bodyParser = require('body-parser')
const http = require('http');
const chalk = require('chalk')
const express = require('express')
const sys = express()
const path = require('path')
const Discord = require ("discord.js"); // discord client
const client = new Discord.Client(); // discord client
let timer = new Set();

var axis = new Object();
// axis[idnum] = [token]


// Create dictionary: user ID + authorization token
// At database creation (when user enters auth) search Dictionary,
// If dictionary returns true then export that [#] out to database.
// DATABASE should consist of:
//
// userId, token, ban, cookie, last
// FROM THERE "Get Started" => now we have a cookie and a local login sql
// can add request src from there

//const sql = require("sqlite");
//sql.open("../sql/pc.sqlite");

function AccessSQL(request, response, Properties) { // This needs to wait till I import cookies
  /*if (type === "lv") {
    setTimeout(() => {
      sql.get(`SELECT * FROM scores WHERE userId = "${uid.id}"`).then(r => {
        if (!r) {
          console.log(chalk.redBright("RECOVERY =>"), chalk.blueBright(`Table Creation.`))
          sql.run(`INSERT INTO scores (userId, tickets, level, chatBits) VALUES (?, ?, ?, ?)`, [uid.id, 1, value * 1, 1]);
          return;
        } else {
          if (r.level * 1 <= -1) {
            sql.run(`UPDATE scores SET level = "${value*1}" WHERE userId = "${uid.id}"`)
          } else {
            sql.run(`UPDATE scores SET level = "${r.level*1 + value*1}" WHERE userId = "${uid.id}"`)
          }
        }
      }).catch(() => {
        console.error;
        console.log(chalk.redBright("RECOVERY =>"), chalk.greenBright(`Database Creaction.`))
        sql.run(`CREATE TABLE IF NOT EXISTS scores (userId TEXT, tickets INTEGER, level INTEGER, chatBits INTEGER)`).then(() => {
          sql.run(`INSERT INTO scores (userId, tickets, level, chatBits)`, [uid.id, 1, value * 1, 1]);
        })
      })
    }, 2000)
  }*/
}

function Cryptographic(xlen) {
  if (!xlen) var xlen = 1
    var charset = "0123456789XYACD+-Oo.eE=/Z",
        retVal = "";
    for (var i = 0, n = charset.length; i < xlen; ++i) {
        retVal += charset.charAt(Math.floor(Math.random() * n));
    }
    console.log(chalk.blueBright("Generated new key = "+retVal))
    return retVal;
}

function GenerateAuthKey(uid) {
  // Connect to bot here
  // Do not commit to SQL unless the auth key is used
  //const persons = client.users
  //const person = persons.find(x => x.id == uid)
  const person = client.users.get(uid)
  if (timer.has(uid)) return fs.readFileSync('pages/throttleWarn.html');
  const token = Cryptographic(18)
  axis[token] = uid;
  timer.add(uid)
  setTimeout(() => {
    timer.delete(uid)
  }, 10000)
  if (person !== null && person !== undefined) {
    person.send({ embed: {
      color: 0x00ffff,
      title: 'shadowsword.tk/pc',
      url: 'https://shadowsword.tk/pc',
      description: 'Use this for your login on Psicarto',
      fields: [
        {
          name: 'Incoming Key!',
          value: `\`\`\`diff\n- [###]\`\`\`**\`\`\`diff\n${token}\`\`\`**`
        }
      ],
      timestamp: new Date()
    }})
    return fs.readFileSync('pages/lcheck.html')
    // ADD Cookie with uid and token
    // ADD Dictionary: uid = token
  } else {
    return fs.readFileSync('pages/NoUserFound.html')
  }
}


function CreateNavigator(request, response) {
    return fs.readFileSync('pages/index.html')
  // Read token header from client-end here
}

function CreateResponse(request, response, handle) {
  if (handle == 'error') return fs.readFileSync('pages/Error.html');
  if (handle == 'idnum') return '';
  if (handle == 'nokey') return fs.readFileSync('pages/nokey.html');
  if (handle == 'key') return fs.readFileSync('pages/Kcheck.html')
}

sys.use(express.static('public'))
sys.use(bodyParser.urlencoded({ extended: false })); // allow POST callback
sys.use(bodyParser.json()); // allow POST callback

sys.get('/pc', (request, response) => {
  const fsHEAD = fs.readFileSync('pages/head.html')
  const fsAAA = CreateNavigator(request, response)// Do some extra stuff to ensure login here
  var fsTRAIL = fs.readFileSync('pages/trail.html')

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
    var fsAAC = ''
    var fsTRAIL = fs.readFileSync('pages/trail.html')
  } else if (idnumber.length !== 0 && key.length == 0 && isNaN(idnumber) == false && idnumber.length >= 18 && idnumber.length < 22) { // If number is a number and the length is proper
    var fsAAA = CreateNavigator(req, res)
    var fsAAC = GenerateAuthKey(idnumber) // Connect with bot and send a message using Discord ID
    var fsAAB = CreateResponse(req, res, 'idnum')
    var fsTRAIL = fs.readFileSync('pages/trail.html')
  } else if (key.length !== 0 && idnumber.length == 0) {
    // THIS IF STATEMENT below should come AFTER a database check!
    if (axis[key] !== undefined) {
      var fsAAA = '' // CreateNavigator(req, res)
      var fsAAB = CreateResponse(req, res, 'key')
      var fsAAC = ''
      var fsTRAIL = '</body></html>'
    } else {
      var fsAAA = CreateNavigator(req, res)
      var fsAAB = CreateResponse(req, res, 'nokey')
      var fsAAC = ''
      var fsTRAIL = fs.readFileSync('pages/trail.html')
    }
  } else {
    var fsAAA = CreateNavigator(req, res)
    var fsAAB = CreateResponse(req, res, 'error')
    var fsAAC = ''
    var fsTRAIL = fs.readFileSync('pages/trail.html')
  }

  const GumGum = fsHEAD + fsAAA + fsTRAIL + fsAAC +  fsAAB
  res.send(GumGum)
});

client.on("ready", () => {
  console.log("SPIRITO-BOT ONLINE")
  client.user.setStatus("online")
});

client.on("message", message => {
  if (message.isMentioned(client.user.id)) {
    message.author.send("Please go to https://shadowsword.tk/pc and enter "+message.author.id+" as your Discord ID")
  }
})

sys.use(function (req, res, next) {
  res.status(404).send("Shit")
})

sys.listen(2600, () => {
  console.log('App listening.')
  client.login(settings.token);
  console.log('Discord listening.')
  client.on('error', console.error)
})
