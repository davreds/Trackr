function signUp(){
  var aError = false;
  var name = document.getElementById("userName").value;
  var email = document.getElementById("userEmail").value;
  var pass1 = document.getElementById("userPassword1").value;
  var pass2 = document.getElementById("userPassword2").value;

  if (validateEmail(email) == true){
    var emailForm = document.getElementById("userEmail");
    emailForm.classList.remove("is-danger");
    emailForm.classList.add("is-success");
  }
  else{
    var emailForm = document.getElementById("userEmail");
    emailForm.classList.remove("is-success");
    emailForm.classList.add("is-danger");
  }

  if(validatePassword(pass1, pass2) == true){
    var passInput1 = document.getElementById("userPassword1");
    passInput1.classList.remove("is-danger");
    passInput1.classList.add("is-success");
    var passInput2 = document.getElementById("userPassword2");
    passInput2.classList.remove("is-danger");
    passInput2.classList.add("is-success");
  }
  else{
    var passInput1 = document.getElementById("userPassword1");
    passInput1.classList.remove("is-success");
    passInput1.classList.add("is-danger");
    var passInput2 = document.getElementById("userPassword2");
    passInput2.classList.remove("is-success");
    passInput2.classList.add("is-danger");
  }

}


function validatePassword(pass1, pass2){
  if(pass1 == pass2 && (pass1 != '' || pass2 != '')){
    return true;
  }
  return false;
}

function validateEmail(email){
  var re = /[A-Z0-9._%+-]+@[A-Z0-9.-]+.[A-Z]{2,4}/igm;
  if (email == '' || !re.test(email))
  {
    return false;
  }

  return true;
}
