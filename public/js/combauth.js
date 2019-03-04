console.log("Authorization comb active")
  var idnumber = document.getElementById("idnumber")
  var key = document.getElementById("key")
  var flashController = document.getElementById("flashArray")
  var flashMessage = document.getElementById("FlashComm")
  var buttonController = document.getElementById("buttonControl")
  buttonController.style.display = "none"
  if (key.value == null && idnumber.value == null) {
    flashController.style.display = "block"
    flashMessage.innerHTML="A value is required before submitting."
  } else {
    buttonController.style.display="block"
  }
