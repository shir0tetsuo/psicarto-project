const settings = require('./settings.json')
const exec = require('child_process').exec;
const fs = require('fs')
const bodyParser = require('body-parser')
const http = require('http');
const chalk = require('chalk')
const express = require('express')
const sys = express()
const path = require('path')
const Cp = require('cookie-parser')
const Discord = require ("discord.js"); // discord client
const client = new Discord.Client(); // discord client


let timer = new Set();
var axis = new Object();


// FIREBASE
const admin = require('firebase-admin');
var svcAcc = require('./service-account.json'); // Purposely excluded from Github
admin.initializeApp({
  credential: admin.credential.cert(svcAcc)
})
var db = admin.firestore();
//\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\
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
//\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\
function newCredentials(axis, key) {
  var docRef = db.collection('pc-user').doc(axis[key]);
  var setAda = docRef.set({
    key: key,
    banned: false
  })
}

function CkCloud(testKey) {

}

function GenerateCookie(key) {
  console.log("Generating cookie.")
  var machine = '';
  machine += '<script type="text/javascript">'
  const dateData = new Date();
  dateData.setHours(dateData.getHours() + 3)
  // Can possibly handle and skip the PC login process and head to the new page.
  machine += `document.cookie = 'uid=${axis[key]}; path="/pc"; Secure; expires=${dateData.toUTCString()};'`;
  machine += '\n'
  machine += `document.cookie = 'key=${key}; path="/pc"; Secure; expires=${dateData.toUTCString()};'`;
  machine += '\n'
  machine += '</script>'
  newCredentials(axis, key)
  return machine
}

function GenerateDBCookie(key, uid) {
  console.log("Generating Database cookie.")
  var machine = '';
  machine += '<script type="text/javascript">'
  const dateData = new Date();
  dateData.setHours(dateData.getHours() + 3)
  // Can possibly handle and skip the PC login process and head to the new page.
  machine += `document.cookie = 'uid=${uid}; path="/pc"; Secure; expires=${dateData.toUTCString()};'`;
  machine += '\n'
  machine += `document.cookie = 'key=${key}; path="/pc"; Secure; expires=${dateData.toUTCString()};'`;
  machine += '\n'
  machine += '</script>'
  newCredentials(axis, key)
  return machine
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
  console.log('CreateResponse @', handle)
  if (handle == 'error') return fs.readFileSync('pages/Error.html');
  if (handle == 'idnum') return '';
  if (handle == 'nokey') return fs.readFileSync('pages/nokey.html');
  if (handle == 'key') return fs.readFileSync('pages/Kcheck.html')
}
////////////////////////////////////////////////////////////////////////////////
sys.use(express.static('public'))
sys.use(Cp())
sys.use(bodyParser.urlencoded({ extended: false })); // allow POST callback
sys.use(bodyParser.json()); // allow POST callback

sys.get('/pc', (request, response) => {
  console.log('PROCESSING', request.url)
  const fsHEAD = fs.readFileSync('pages/head.html')
  const fsAAA = CreateNavigator(request, response)// Do some extra stuff to ensure login here
  var fsTRAIL = fs.readFileSync('pages/trail.html')

  const GumGum = fsHEAD + fsAAA + fsTRAIL
  //response.sendFile(path.resolve(__dirname, 'pages/index.html'))
  response.send(GumGum)
})
function userLOGOUT(request, response) {
  console.log('PROCESSING LOGOUT REQUEST')
  returnPage = fs.readFileSync('pages/301.html')
  response.send(returnPage);
  //response.redirect('/pc');
  return;
}
sys.get('/pc/base', (request, response) => {
  console.log(chalk.greenBright('==== PROCESSING /pc/base REQUEST'))
  // Connect to database here. Use cookie parser here.
  // if (cookie[database] !== undefined) .. else { response.send() }
  var userKey = request.cookies.key;
  var userUID = request.cookies.uid;
  console.log('cookies => ', request.cookies)
  db.collection('pc-user').get().then((snapshot) => {
    snapshot.forEach((doc) => {
      var trueId = Math.round(parseInt(doc.id));
      var testId = Math.round(parseInt(userUID));
      console.log(trueId, testId)
      console.log(doc._fieldsProto.key.stringValue)
      console.log(userKey)
      if (trueId = testId) {
        if (doc._fieldsProto.key.stringValue = userKey) {
          response.send("Hello, World!") // DO LOTS OF THINGS HERE.
          console.log('Returning Data.')
          return
        }
      }
    }).catch(() => {
      console.log('SNAPSHOT ERROR!')
    })
  }).catch(() => {
    console.log('COLLECTION ERROR!')
    response.redirect('/pc')
  })
  return
});


// TODO: Test idnumber against key, add database
sys.post('/pc/login',function(req,res){
  console.log(chalk.greenBright('==== HANDLING /PC/LOGIN Request'))
  var idnumber=req.body.idnumber;
  var key = req.body.key;
  const fsHEAD = fs.readFileSync('pages/head.html')
  if (idnumber.length !== 0 && key.length !== 0) {
    console.log(chalk.redBright('ID ZERO & KEY ZERO'))
    var fsAAA = CreateNavigator(req, res)
    var fsAAB = CreateResponse(req, res, 'error')
    var fsAAC = ''
    var fsTRAIL = fs.readFileSync('pages/trail.html')
  } else if (idnumber.length !== 0 && key.length == 0 && isNaN(idnumber) == false && idnumber.length >= 18 && idnumber.length < 22) { // If number is a number and the length is proper
    console.log(chalk.blueBright('IDLENGTH OK'))
    var fsAAA = CreateNavigator(req, res)
    var fsAAC = GenerateAuthKey(idnumber) // Connect with bot and send a message using Discord ID
    var fsAAB = CreateResponse(req, res, 'idnum')
    var fsTRAIL = fs.readFileSync('pages/trail.html')
  } else if (key.length !== 0 && idnumber.length == 0) {
    console.log('KEYLENGTH OK')
    //// TODO
    // THIS IF STATEMENT below should come AFTER a database check!
    // CHECK DATABASE for this key and associate a user to it.
    // OTHERWISE check for a cookie.
    db.collection('pc-user').get().then((snapshot) => {
      snapshot.forEach((doc) => {
        var trueId = Math.round(parseInt(doc.id));
        console.log(key, chalk.yellowBright('against'), doc._fieldsProto.key.stringValue, chalk.blueBright('=> CkCloud'))
        if (doc._fieldsProto.key.stringValue == key) {
          console.log('Returning SUCCESS @ CkCloud')
          var checkCloud = doc.id
        }
      }).catch(() => {
        console.log('SNAPSHOT ERROR! @ CkCloud')
      })
      if (checkCloud) {
        console.log(chalk.blueBright('CLOUD RETURNED =>', checkCloud))
        var fsAAA = GenerateDBCookie(key, checkCloud);
        var fsAAB = CreateResponse(req, res, 'key');
        var vsAAC = '';
        var fsTRAIL = '';
      } else if (axis[key] !== undefined) {
        console.log('CHECKING LOCAL AXIS')
        var fsAAA = GenerateCookie(key) // CreateNavigator(req, res)
        var fsAAB = CreateResponse(req, res, 'key')
        var fsAAC = ''
        var fsTRAIL = ''
      } else if (!checkCloud) {
        console.log(chalk.redBright('Parsing bad checkCloud @', checkCloud, key))
        var fsAAA = CreateNavigator(req, res),
        fsAAB = CreateResponse(req, res, 'nokey'),
        fsAAC = '<br><tilde>The dedicated server could not process your request.</tilde><br>',
        fsTRAIL = fs.readFileSync('pages/trail.html')
      } else {
        console.log(chalk.redBright('Internal error'))
        var fsAAA = CreateNavigator(req, res)
        var fsAAB = CreateResponse(req, res, 'nokey')
        var fsAAC = ''
        var fsTRAIL = fs.readFileSync('pages/trail.html')
      }
    }).catch(() => {
      console.log('COLLECTION ERROR! @ CkCloud (301)')
    })

  } else {
    console.log(chalk.redBright('Internal error'))
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
  console.log(chalk.redBright('404 Reached @', req.url))
  var axdead = '';
  axdead += '<!DOCTYPE html>\n'
  axdead += '<html><head><link rel="stylesheet" href="/pc/css/main.css"></head><body>\n'
  axdead += '<h1><yellow>Oh.</yellow></h1><tilde>The resource you are attempting to access is unavailable. <a href="/pc">Return</a></tilde></body></html>'
  res.status(404).send(axdead)
})
//test

sys.listen(2600, () => {
  console.log('App listening.')
  client.login(settings.token);
  console.log('Discord listening.')
  client.on('error', console.error)
})
