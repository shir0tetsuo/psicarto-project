const chalk = require('chalk')
module.exports = {
   Cryptographic: function (xlen) {
    if (!xlen) var xlen = 1
      var charset = "0123456789XYACD+-Oo.eE=/Z",
          retVal = "";
      for (var i = 0, n = charset.length; i < xlen; ++i) {
          retVal += charset.charAt(Math.floor(Math.random() * n));
      }
      console.log(chalk.blueBright("Generated new key = "+retVal))
      return retVal;
  }
}
