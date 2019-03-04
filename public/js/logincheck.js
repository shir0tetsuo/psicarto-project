function check_user() {
  var idnum = document.getElementById("idnumber"),
  key = document.getElementById("key"),
  flashBox = document.getElementById("flashArray"),
  flashMSG = document.getElementById("flashComm"),
  boxCTL = document.getElementById("buttonControl")
  const digits_only = string => [...string].every(c => '0123456789'.includes(c))
  console.log("Update issued")
  if (idnum.value.length !== 0 && key.value.length !== 0) {
    flashBox.style.display = "block"
    flashMSG.innerHTML = "Both fields cannot be filled at the same time"
    boxCTL.style.display = "none"
  } else if (idnum.value.length == 0 && key.value.length == 0) {
    flashBox.style.display = "block"
    flashMSG.innerHTML = "Please enter a Discord ID or Auth Key<br>Your Auth Key should be a unique ID submitted to you via DMs"
    boxCTL.style.display = "none"
  } else {
    if (digits_only(idnum.value) == true) {
      flashBox.style.display = "none"
      boxCTL.style.display = "block"
    } else {
      flashBox.style.display = "block"
      flashMSG.innerHTML = "Your Discord ID should only be numbers."
      boxCTL.style.display = "none"
    }
  }
}
