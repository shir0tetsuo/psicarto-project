function check_user() {
  var idnum = document.getElementById("idnumber"),
  key = document.getElementById("key"),
  flashBox = document.getElementById("flashArray"),
  flashMSG = document.getElementById("flashComm"),
  boxCTL = document.getElementById("buttonControl")
  console.log("Update issued")
  if (idnum.value.length !== 0 && key.value.length !== 0) {
    flashBox.style.display = "block"
    flashMSG.innerHTML = "Both fields cannot be filled at the same time"
    boxCTL.style.display = "none"
  } else if (idnum.value.length == 0 && key.value.length == 0) {
    flashBox.style.display = "block"
    flashMSG.innerHTML = "Please enter a Discord ID or Auth Key<br>Your Auth Key should be a unique token submitted to you via DMs via the Spirito Bot.<br>You can mention the Spirito Bot to give you your Discord ID if you don't have developer tools enabled."
    boxCTL.style.display = "none"
  } else {
    flashBox.style.display = "none"
    boxCTL.style.display = "block"
  }
  setTimeout(() => {
    check_user()
  }, 2000)
}
