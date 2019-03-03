#!/bin/bash
npm i -g npm # update
# NPM is pain
echo Stage 1
rm -r node_modules/
#rm package.json
rm package-lock.json
echo Stage 2
npm cache clean --force
npm prune
npm update
npm install npm@latest -g
echo Stage 3
npm install --save discord.js #discord runtime
#npm install --save node-opus
#npm install --save libsodium-wrapper
#npm install --save erlpack
#npm install --save opusscript
#npm install --save bufferutil
#npm install --save sodium
#npm install --save uws
npm install --save chalk #highlighting
#npm install --save chalk-animation
npm install --save npmlog #N/A
npm install --save got # online stuff
npm install --save irc # for IRCShadow
npm install --save irc-colors # for IRCShadow
npm install --save socket.io # stuff for server comm
npm install --save express # stuff for file comm
#npm install --save canvas-constructor # Makes images
#npm install --save fs-nextra # Extra async data
#npm install --save snekfetch # Extra async data
#npm install --save firebase
npm install --save http
npm install --save querystring
npm install --save formdata
#npm install --save chess.js
npm install --save wttr
npm install --save sqlite3 #database
#npm install --save chess.js
#cp /node/BAK/node_modules/sqlite -r /root/NC/utils/NorthStar/sabre.discord.js/node_modules/
echo Done

